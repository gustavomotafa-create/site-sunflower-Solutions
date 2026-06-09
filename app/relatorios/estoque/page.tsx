import Layout from "@/components/Layout";
import { prisma } from "@/lib/prisma";

export default async function RelatorioEstoque() {
  const produtos = await prisma.produto.findMany({
    include: {
      fornecedor: true,
    },
    orderBy: {
      nome: "asc",
    },
  });

  const valorTotalEstoque = produtos.reduce(
    (total, produto) => total + produto.estoque * produto.precoCompra,
    0
  );

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Relatório de Estoque</h1>

        <p className="text-neutral-400 mb-8">
          Controle completo do estoque atual do Açougue Maracanã.
        </p>

        <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-bold text-yellow-400">
            Valor parado em estoque
          </h2>

          <p className="text-4xl font-bold mt-4">
            {valorTotalEstoque.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="p-3 text-left">Código</th>
                <th className="p-3 text-left">Produto</th>
                <th className="p-3 text-left">Fornecedor</th>
                <th className="p-3 text-left">Estoque</th>
                <th className="p-3 text-left">Unidade</th>
                <th className="p-3 text-left">Compra</th>
                <th className="p-3 text-left">Valor Estoque</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {produtos.map((produto) => {
                const valorEstoque = produto.estoque * produto.precoCompra;
                const estoqueBaixo = produto.estoque <= 5;

                return (
                  <tr key={produto.id} className="border-b border-neutral-800">
                    <td className="p-3">{produto.id}</td>
                    <td className="p-3">{produto.nome}</td>
                    <td className="p-3">{produto.fornecedor?.nome || "-"}</td>
                    <td className="p-3">{produto.estoque}</td>
                    <td className="p-3">{produto.unidade}</td>
                    <td className="p-3">
                      {produto.precoCompra.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="p-3">
                      {valorEstoque.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="p-3">
                      {estoqueBaixo ? (
                        <span className="text-red-400 font-bold">
                          Estoque baixo
                        </span>
                      ) : (
                        <span className="text-green-400 font-bold">OK</span>
                      )}
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