import Layout from "@/components/Layout";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function criarFornecedor(formData: FormData) {
  "use server";

  const nome = String(formData.get("nomeFornecedor") || "");

  if (!nome) return;

  await prisma.fornecedor.create({
    data: { nome },
  });

  revalidatePath("/produtos");

  redirect(
    "/produtos?sucesso=" +
      encodeURIComponent("Fornecedor salvo com sucesso")
  );
}

async function excluirFornecedor(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));

  if (!id) return;

  const fornecedorEmProduto = await prisma.produto.findFirst({
    where: {
      fornecedorId: id,
    },
  });

  const fornecedorEmCompra = await prisma.compra.findFirst({
    where: {
      fornecedorId: id,
    },
  });

  if (fornecedorEmProduto || fornecedorEmCompra) {
    redirect(
      "/produtos?sucesso=" +
        encodeURIComponent(
          "Este fornecedor não pode ser excluído porque já possui produtos ou compras vinculadas"
        )
    );
  }

  await prisma.fornecedor.delete({
    where: { id },
  });

  revalidatePath("/produtos");

  redirect(
    "/produtos?sucesso=" +
      encodeURIComponent("Fornecedor excluído com sucesso")
  );
}

async function criarProduto(formData: FormData) {
  "use server";

  const nome = String(formData.get("nome") || "");
  const precoCompra = Number(formData.get("precoCompra") || 0);
  const precoVenda = Number(formData.get("precoVenda") || 0);
  const estoque = Number(formData.get("estoque") || 0);
  const unidade = String(formData.get("unidade") || "KG");
  const fornecedorId = Number(formData.get("fornecedorId") || 0);

  if (!nome) return;

  await prisma.produto.create({
    data: {
      nome,
      precoCompra,
      precoVenda,
      estoque,
      unidade,
      fornecedorId: fornecedorId || null,
    },
  });

  revalidatePath("/produtos");
  revalidatePath("/relatorios/produtos");
  revalidatePath("/relatorios/estoque");

  redirect(
    "/produtos?sucesso=" +
      encodeURIComponent("Produto salvo com sucesso")
  );
}

async function editarProduto(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));
  const nome = String(formData.get("nome") || "");
  const precoCompra = Number(formData.get("precoCompra") || 0);
  const precoVenda = Number(formData.get("precoVenda") || 0);
  const estoque = Number(formData.get("estoque") || 0);
  const unidade = String(formData.get("unidade") || "KG");
  const fornecedorId = Number(formData.get("fornecedorId") || 0);

  if (!id || !nome) return;

  await prisma.produto.update({
    where: { id },
    data: {
      nome,
      precoCompra,
      precoVenda,
      estoque,
      unidade,
      fornecedorId: fornecedorId || null,
    },
  });

  revalidatePath("/produtos");
  revalidatePath("/relatorios/produtos");
  revalidatePath("/relatorios/estoque");

  redirect(
    "/produtos?sucesso=" +
      encodeURIComponent("Produto alterado com sucesso")
  );
}

async function excluirProduto(formData: FormData) {
  "use server";

  const id = Number(formData.get("id"));

  if (!id) return;

  const produtoEmVenda = await prisma.itemVenda.findFirst({
    where: {
      produtoId: id,
    },
  });

  const produtoEmCompra = await prisma.itemCompra.findFirst({
    where: {
      produtoId: id,
    },
  });

  if (produtoEmVenda || produtoEmCompra) {
    redirect(
      "/produtos?sucesso=" +
        encodeURIComponent(
          "Este produto não pode ser excluído porque já possui histórico de venda ou compra"
        )
    );
  }

  await prisma.produto.delete({
    where: { id },
  });

  revalidatePath("/produtos");
  revalidatePath("/relatorios/produtos");
  revalidatePath("/relatorios/estoque");

  redirect(
    "/produtos?sucesso=" +
      encodeURIComponent("Produto excluído com sucesso")
  );
}

export default async function Produtos() {
  const produtos = await prisma.produto.findMany({
    include: {
      fornecedor: true,
    },
    orderBy: {
      id: "desc",
    },
  });

  const fornecedores = await prisma.fornecedor.findMany({
    orderBy: {
      nome: "asc",
    },
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Produtos</h1>

        <p className="text-neutral-400 mb-8">
          Cadastro de produtos, estoque, preços e fornecedores.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <form
            action={criarProduto}
            className="lg:col-span-2 bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6"
          >
            <h2 className="text-2xl font-bold mb-4">Cadastrar Produto</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input name="nome" className="input" placeholder="Nome do produto" />

              <input
                name="precoCompra"
                className="input"
                placeholder="Preço de compra"
                type="number"
                step="0.01"
              />

              <input
                name="precoVenda"
                className="input"
                placeholder="Preço de venda"
                type="number"
                step="0.01"
              />

              <input
                name="estoque"
                className="input"
                placeholder="Estoque"
                type="number"
                step="0.01"
              />

              <select name="unidade" className="input">
                <option value="KG">KG</option>
                <option value="UN">Unidade</option>
                <option value="CX">Caixa</option>
                <option value="PCT">Pacote</option>
              </select>

              <select name="fornecedorId" className="input">
                <option value="">Selecione o fornecedor</option>

                {fornecedores.map((fornecedor) => (
                  <option key={fornecedor.id} value={fornecedor.id}>
                    {fornecedor.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 mt-6">
              <button type="submit" className="btn-primary">
                Salvar Produto
              </button>
            </div>
          </form>

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-2xl font-bold mb-4">Fornecedores</h2>

            <form action={criarFornecedor} className="flex gap-3 mb-4">
              <input
                name="nomeFornecedor"
                className="input"
                placeholder="Nome do fornecedor"
              />

              <button type="submit" className="btn-primary">
                Add
              </button>
            </form>

            <div className="space-y-2">
              {fornecedores.map((fornecedor) => (
                <div
                  key={fornecedor.id}
                  className="flex items-center justify-between bg-neutral-950 border border-neutral-800 rounded-xl p-3"
                >
                  <span>{fornecedor.nome}</span>

                  <form action={excluirFornecedor}>
                    <input type="hidden" name="id" value={fornecedor.id} />

                    <button type="submit" className="btn-danger">
                      Excluir
                    </button>
                  </form>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6 mt-8">
          <h2 className="text-2xl font-bold mb-4">Produtos cadastrados</h2>

          <div className="space-y-4">
            {produtos.map((produto) => (
              <form
                key={produto.id}
                action={editarProduto}
                className="grid grid-cols-1 md:grid-cols-8 gap-3 items-center bg-neutral-950 border border-neutral-800 rounded-xl p-4"
              >
                <input type="hidden" name="id" value={produto.id} />

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Código</p>
                  <p className="font-bold">{produto.id}</p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-xs text-neutral-500 mb-1">Produto</p>
                  <input
                    name="nome"
                    className="input"
                    defaultValue={produto.nome}
                  />
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Compra</p>
                  <input
                    name="precoCompra"
                    className="input"
                    type="number"
                    step="0.01"
                    defaultValue={produto.precoCompra}
                  />
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Venda</p>
                  <input
                    name="precoVenda"
                    className="input"
                    type="number"
                    step="0.01"
                    defaultValue={produto.precoVenda}
                  />
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Estoque</p>
                  <input
                    name="estoque"
                    className="input"
                    type="number"
                    step="0.01"
                    defaultValue={produto.estoque}
                  />
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Unidade</p>
                  <select
                    name="unidade"
                    className="input"
                    defaultValue={produto.unidade}
                  >
                    <option value="KG">KG</option>
                    <option value="UN">UN</option>
                    <option value="CX">CX</option>
                    <option value="PCT">PCT</option>
                  </select>
                </div>

                <div>
                  <p className="text-xs text-neutral-500 mb-1">Fornecedor</p>
                  <select
                    name="fornecedorId"
                    className="input"
                    defaultValue={produto.fornecedorId || ""}
                  >
                    <option value="">Sem fornecedor</option>

                    {fornecedores.map((fornecedor) => (
                      <option key={fornecedor.id} value={fornecedor.id}>
                        {fornecedor.nome}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2 md:col-span-8">
                  <button type="submit" className="btn-primary">
                    Salvar Alteração
                  </button>
                </div>
              </form>
            ))}
          </div>

          <div className="mt-6">
            {produtos.map((produto) => (
              <form
                key={`excluir-${produto.id}`}
                action={excluirProduto}
                className="inline-block mr-3 mb-3"
              >
                <input type="hidden" name="id" value={produto.id} />

                <button type="submit" className="btn-danger">
                  Excluir {produto.nome}
                </button>
              </form>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}