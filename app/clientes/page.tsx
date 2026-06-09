import Layout from "@/components/Layout";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function criarCliente(formData: FormData) {
  "use server";

  const nome = String(formData.get("nome") || "");
  const telefone = String(formData.get("telefone") || "");
  const endereco = String(formData.get("endereco") || "");

  if (!nome) return;

  await prisma.cliente.create({
    data: {
      nome,
      telefone,
      endereco,
    },
  });

  revalidatePath("/clientes");
  revalidatePath("/caixa");

  redirect(
    "/clientes?sucesso=" +
      encodeURIComponent("Cliente salvo com sucesso")
  );
}

async function editarCliente(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));
  const nome = String(formData.get("nome") || "");
  const telefone = String(formData.get("telefone") || "");
  const endereco = String(formData.get("endereco") || "");

  if (!id || !nome) return;

  await prisma.cliente.update({
    where: {
      id,
    },
    data: {
      nome,
      telefone,
      endereco,
    },
  });

  revalidatePath("/clientes");
  revalidatePath("/caixa");
  revalidatePath("/relatorios");
  revalidatePath("/relatorios/vendas");

  redirect(
    "/clientes?sucesso=" +
      encodeURIComponent("Cliente alterado com sucesso")
  );
}

async function excluirCliente(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));

  if (!id) return;

  const clienteEmVenda = await prisma.venda.findFirst({
    where: {
      clienteId: id,
    },
  });

  if (clienteEmVenda) {
    redirect(
      "/clientes?sucesso=" +
        encodeURIComponent(
          "Este cliente não pode ser excluído porque já possui histórico de venda"
        )
    );
  }

  await prisma.cliente.delete({
    where: {
      id,
    },
  });

  revalidatePath("/clientes");
  revalidatePath("/caixa");
  revalidatePath("/relatorios");
  revalidatePath("/relatorios/vendas");

  redirect(
    "/clientes?sucesso=" +
      encodeURIComponent("Cliente excluído com sucesso")
  );
}

export default async function Clientes() {
  const clientes = await prisma.cliente.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Clientes</h1>

        <p className="text-neutral-400 mb-8">
          Cadastro e gerenciamento de clientes do Açougue Maracanã.
        </p>

        <form
          action={criarCliente}
          className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6"
        >
          <h2 className="text-2xl font-bold mb-4">Cadastrar Cliente</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input name="nome" className="input" placeholder="Nome do cliente" />
            <input name="telefone" className="input" placeholder="Telefone" />
            <input name="endereco" className="input" placeholder="Endereço" />
          </div>

          <div className="flex gap-3 mt-6">
            <button type="submit" className="btn-primary">
              Salvar Cliente
            </button>
          </div>
        </form>

        <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Clientes cadastrados</h2>

          <div className="space-y-4">
            {clientes.map((cliente) => (
              <form
                key={cliente.id}
                action={editarCliente}
                className="grid grid-cols-1 md:grid-cols-6 gap-3 items-center bg-neutral-950 border border-neutral-800 rounded-xl p-4"
              >
                <input type="hidden" name="id" value={cliente.id} />

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Código</p>
                  <p className="font-bold">{cliente.id}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs text-neutral-500 mb-1">Nome</p>
                  <input
                    name="nome"
                    className="input"
                    defaultValue={cliente.nome}
                  />
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Telefone</p>
                  <input
                    name="telefone"
                    className="input"
                    defaultValue={cliente.telefone || ""}
                  />
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Endereço</p>
                  <input
                    name="endereco"
                    className="input"
                    defaultValue={cliente.endereco || ""}
                  />
                </div>

                <div className="flex gap-2">
                  <button type="submit" className="btn-primary">
                    Salvar
                  </button>
                </div>
              </form>
            ))}
          </div>

          <div className="mt-6">
            {clientes.map((cliente) => (
              <form
                key={`excluir-${cliente.id}`}
                action={excluirCliente}
                className="inline-block mr-3 mb-3"
              >
                <input type="hidden" name="id" value={cliente.id} />

                <button type="submit" className="btn-danger">
                  Excluir {cliente.nome}
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}