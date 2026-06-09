import Layout from "@/components/Layout";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function criarCompra(formData: FormData) {
  "use server";

  const fornecedorId = Number(formData.get("fornecedorId") || 0);
  const produtoId = Number(formData.get("produtoId") || 0);
  const numeroPedido = String(formData.get("numeroPedido") || "");
  const precoKg = Number(formData.get("precoKg") || 0);
  const quantidade = Number(formData.get("quantidade") || 0);

  if (!produtoId || !precoKg || !quantidade) return;

  const total = precoKg * quantidade;

  await prisma.compra.create({
    data: {
      fornecedorId: fornecedorId || null,
      numeroPedido,
      valorTotal: total,
      itens: {
        create: {
          produtoId,
          precoKg,
          quantidade,
          total,
        },
      },
    },
  });

  await prisma.produto.update({
    where: {
      id: produtoId,
    },
    data: {
      estoque: {
        increment: quantidade,
      },
      precoCompra: precoKg,
    },
  });

  revalidatePath("/compras");
  revalidatePath("/produtos");
  revalidatePath("/relatorios");
  revalidatePath("/relatorios/estoque");
  revalidatePath("/relatorios/produtos");

  redirect(
    "/compras?sucesso=" +
      encodeURIComponent("Compra salva com sucesso")
  );
}

async function excluirCompra(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));

  if (!id) return;

  const compra = await prisma.compra.findUnique({
    where: { id },
    include: {
      itens: true,
    },
  });

  if (!compra) return;

  for (const item of compra.itens) {
    await prisma.produto.update({
      where: {
        id: item.produtoId,
      },
      data: {
        estoque: {
          decrement: item.quantidade,
        },
      },
    });
  }

  await prisma.itemCompra.deleteMany({
    where: {
      compraId: id,
    },
  });

  await prisma.compra.delete({
    where: {
      id,
    },
  });

  revalidatePath("/compras");
  revalidatePath("/produtos");
  revalidatePath("/relatorios");
  revalidatePath("/relatorios/estoque");
  revalidatePath("/relatorios/produtos");

  redirect(
    "/compras?sucesso=" +
      encodeURIComponent("Compra excluída com sucesso")
  );
}

export default async function Compras() {
  const fornecedores = await prisma.fornecedor.findMany({
    orderBy: {
      nome: "asc",
    },
  });

  const produtos = await prisma.produto.findMany({
    orderBy: {
      nome: "asc",
    },
  });

  const compras = await prisma.compra.findMany({
    include: {
      fornecedor: true,
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

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Compras</h1>

        <p className="text-neutral-400 mb-8">
          Controle de compras, fornecedores e entrada automática no estoque.
        </p>

        <form
          action={criarCompra}
          className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Nova Compra</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <input
              name="numeroPedido"
              className="input"
              placeholder="Número do pedido"
            />

            <select name="fornecedorId" className="input">
              <option value="">Fornecedor</option>

              {fornecedores.map((fornecedor) => (
                <option key={fornecedor.id} value={fornecedor.id}>
                  {fornecedor.nome}
                </option>
              ))}
            </select>

            <select name="produtoId" className="input">
              <option value="">Produto</option>

              {produtos.map((produto) => (
                <option key={produto.id} value={produto.id}>
                  {produto.nome} - estoque atual: {produto.estoque} {produto.unidade}
                </option>
              ))}
            </select>

            <input
              name="precoKg"
              className="input"
              placeholder="Preço por KG"
              type="number"
              step="0.01"
            />

            <input
              name="quantidade"
              className="input"
              placeholder="Quantidade"
              type="number"
              step="0.01"
            />
          </div>

          <button type="submit" className="btn-primary">
            Salvar Compra
          </button>
        </form>

        <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Compras cadastradas</h2>

          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-neutral-700">
                <th className="p-3">Código</th>
                <th className="p-3">Pedido</th>
                <th className="p-3">Fornecedor</th>
                <th className="p-3">Produto</th>
                <th className="p-3">Preço/KG</th>
                <th className="p-3">Qtd</th>
                <th className="p-3">Total</th>
                <th className="p-3">Ações</th>
              </tr>
            </thead>

            <tbody>
              {compras.map((compra) => {
                const item = compra.itens[0];

                return (
                  <tr key={compra.id} className="border-b border-neutral-800">
                    <td className="p-3">{compra.id}</td>
                    <td className="p-3">{compra.numeroPedido || "-"}</td>
                    <td className="p-3">{compra.fornecedor?.nome || "-"}</td>
                    <td className="p-3">{item?.produto?.nome || "-"}</td>
                    <td className="p-3">
                      R$ {item?.precoKg?.toFixed(2) || "0.00"}
                    </td>
                    <td className="p-3">{item?.quantidade || 0}</td>
                    <td className="p-3">
                      R$ {compra.valorTotal.toFixed(2)}
                    </td>
                    <td className="p-3">
                      <form action={excluirCompra}>
                        <input type="hidden" name="id" value={compra.id} />

                        <button type="submit" className="btn-danger">
                          Excluir
                        </button>
                      </form>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
}