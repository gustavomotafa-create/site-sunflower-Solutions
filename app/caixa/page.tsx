import Layout from "@/components/Layout";
import CaixaClient from "@/components/CaixaClient";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function finalizarVenda(formData: FormData) {
  "use server";

  const clienteId = Number(formData.get("clienteId") || 0);
  const formaPgto = String(formData.get("formaPgto") || "Dinheiro");
  const itensTexto = String(formData.get("itens") || "[]");

  const itens = JSON.parse(itensTexto) as {
    produtoId: number;
    quantidade: number;
    preco: number;
    total: number;
  }[];

  if (itens.length === 0) return;

  const total = itens.reduce((soma, item) => soma + item.total, 0);

  for (const item of itens) {
    const produto = await prisma.produto.findUnique({
      where: { id: item.produtoId },
    });

    if (!produto || produto.estoque < item.quantidade) {
      redirect(
        "/caixa?sucesso=" +
          encodeURIComponent("Estoque insuficiente para finalizar a venda")
      );
    }
  }

  await prisma.venda.create({
    data: {
      clienteId: clienteId || null,
      total,
      formaPgto,
      itens: {
        create: itens.map((item) => ({
          produtoId: item.produtoId,
          quantidade: item.quantidade,
          preco: item.preco,
        })),
      },
    },
  });

  for (const item of itens) {
    await prisma.produto.update({
      where: { id: item.produtoId },
      data: {
        estoque: {
          decrement: item.quantidade,
        },
      },
    });
  }

  revalidatePath("/caixa");
  revalidatePath("/produtos");
  revalidatePath("/relatorios");
  revalidatePath("/relatorios/vendas");
  revalidatePath("/relatorios/estoque");
  revalidatePath("/relatorios/produtos");

  redirect(
    "/caixa?sucesso=" +
      encodeURIComponent("Venda finalizada com sucesso")
  );
}

async function excluirVenda(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));

  if (!id) return;

  const venda = await prisma.venda.findUnique({
    where: { id },
    include: {
      itens: true,
    },
  });

  if (!venda) return;

  for (const item of venda.itens) {
    await prisma.produto.update({
      where: {
        id: item.produtoId,
      },
      data: {
        estoque: {
          increment: item.quantidade,
        },
      },
    });
  }

  await prisma.itemVenda.deleteMany({
    where: {
      vendaId: id,
    },
  });

  await prisma.venda.delete({
    where: {
      id,
    },
  });

  revalidatePath("/caixa");
  revalidatePath("/produtos");
  revalidatePath("/relatorios");
  revalidatePath("/relatorios/vendas");
  revalidatePath("/relatorios/estoque");
  revalidatePath("/relatorios/produtos");

  redirect(
    "/caixa?sucesso=" +
      encodeURIComponent("Venda excluída com sucesso")
  );
}

export default async function Caixa() {
  const inicioHoje = new Date();
  inicioHoje.setHours(0, 0, 0, 0);

  const fimHoje = new Date();
  fimHoje.setHours(23, 59, 59, 999);

  const clientes = await prisma.cliente.findMany({
    orderBy: {
      nome: "asc",
    },
  });

  const produtos = await prisma.produto.findMany({
    orderBy: {
      nome: "asc",
    },
  });

  const todasVendas = await prisma.venda.findMany();

  const vendasHoje = await prisma.venda.findMany({
    where: {
      criadoEm: {
        gte: inicioHoje,
        lte: fimHoje,
      },
    },
    include: {
      cliente: true,
      itens: {
        include: {
          produto: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  const totalVendido = todasVendas.reduce(
    (total, venda) => total + venda.total,
    0
  );

  const totalHoje = vendasHoje.reduce(
    (total, venda) => total + venda.total,
    0
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Caixa / Vendas</h1>

        <p className="text-neutral-400 mb-8">
          Registro de vendas com múltiplos produtos, cálculo automático, troco e baixa no estoque.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400">Total geral</h2>

            <p className="text-4xl font-bold mt-4">
              {totalVendido.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400">Total hoje</h2>

            <p className="text-4xl font-bold mt-4">
              {totalHoje.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Vendas de hoje
            </h2>

            <p className="text-4xl font-bold mt-4">{vendasHoje.length}</p>
          </div>
        </div>

        <CaixaClient
          clientes={clientes}
          produtos={produtos}
          finalizarVenda={finalizarVenda}
        />

        <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Vendas de hoje</h2>

          {vendasHoje.length === 0 ? (
            <p className="text-neutral-400">
              Nenhuma venda registrada hoje.
            </p>
          ) : (
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-neutral-700">
                  <th className="p-3">Código</th>
                  <th className="p-3">Data</th>
                  <th className="p-3">Cliente</th>
                  <th className="p-3">Itens</th>
                  <th className="p-3">Total</th>
                  <th className="p-3">Pagamento</th>
                  <th className="p-3">Ações</th>
                </tr>
              </thead>

              <tbody>
                {vendasHoje.map((venda) => (
                  <tr key={venda.id} className="border-b border-neutral-800">
                    <td className="p-3">{venda.id}</td>

                    <td className="p-3">
                      {venda.criadoEm.toLocaleDateString("pt-BR")}
                    </td>

                    <td className="p-3">{venda.cliente?.nome || "-"}</td>

                    <td className="p-3">
                      {venda.itens.map((item) => (
                        <div key={item.id}>
                          {item.produto.nome} - {item.quantidade} x{" "}
                          {item.preco.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </div>
                      ))}
                    </td>

                    <td className="p-3">
                      {venda.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>

                    <td className="p-3">{venda.formaPgto}</td>

                    <td className="p-3">
                      <form action={excluirVenda}>
                        <input type="hidden" name="id" value={venda.id} />

                        <button type="submit" className="btn-danger">
                          Excluir
                        </button>
                      </form>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}