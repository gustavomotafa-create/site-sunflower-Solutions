import Layout from "@/components/Layout";
import { prisma } from "@/lib/prisma";

export default async function Relatorios() {
  const totalClientes = await prisma.cliente.count();

  const totalProdutos = await prisma.produto.count();

  const totalCompras = await prisma.compra.count();

  const totalVendas = await prisma.venda.count();

  const produtos = await prisma.produto.findMany();

  const estoqueTotal = produtos.reduce(
    (total, produto) => total + produto.estoque,
    0
  );

  const valorVendas = await prisma.venda.aggregate({
    _sum: {
      total: true,
    },
  });

  const valorCompras = await prisma.compra.aggregate({
    _sum: {
      valorTotal: true,
    },
  });

  const vendasRecentes = await prisma.venda.findMany({
    take: 10,
    orderBy: {
      id: "desc",
    },
    include: {
      cliente: true,
    },
  });

  const produtosBaixoEstoque = await prisma.produto.findMany({
    where: {
      estoque: {
        lte: 5,
      },
    },
    orderBy: {
      estoque: "asc",
    },
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          Relatórios
        </h1>

        <p className="text-neutral-400 mb-8">
          Indicadores gerais do sistema Maracanã.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Clientes
            </h2>

            <p className="text-4xl font-bold mt-4">
              {totalClientes}
            </p>
          </div>

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Produtos
            </h2>

            <p className="text-4xl font-bold mt-4">
              {totalProdutos}
            </p>
          </div>

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Compras
            </h2>

            <p className="text-4xl font-bold mt-4">
              {totalCompras}
            </p>
          </div>

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Vendas
            </h2>

            <p className="text-4xl font-bold mt-4">
              {totalVendas}
            </p>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Estoque Total
            </h2>

            <p className="text-3xl font-bold mt-4">
              {estoqueTotal.toLocaleString("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})}
            </p>
          </div>

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Total Comprado
            </h2>

            <p className="text-3xl font-bold mt-4">
              {(valorCompras._sum.valorTotal || 0).toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
})}
            </p>
          </div>

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Total Vendido
            </h2>

            <p className="text-3xl font-bold mt-4">
              {(valorVendas._sum.total || 0).toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
})}
            </p>
          </div>

        </div>

        <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4">
            Últimas Vendas
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="p-3 text-left">Código</th>
                <th className="p-3 text-left">Cliente</th>
                <th className="p-3 text-left">Forma Pgto</th>
                <th className="p-3 text-left">Total</th>
              </tr>
            </thead>

            <tbody>
              {vendasRecentes.map((venda) => (
                <tr
                  key={venda.id}
                  className="border-b border-neutral-800"
                >
                  <td className="p-3">{venda.id}</td>

                  <td className="p-3">
                    {venda.cliente?.nome || "-"}
                  </td>

                  <td className="p-3">
                    {venda.formaPgto}
                  </td>

                  <td className="p-3">
                    {venda.total.toLocaleString("pt-BR", {
  style: "currency",
  currency: "BRL",
})}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

        <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6 mt-8">

          <h2 className="text-2xl font-bold mb-4 text-red-400">
            Produtos com Estoque Baixo
          </h2>

          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="p-3 text-left">Produto</th>
                <th className="p-3 text-left">Estoque</th>
              </tr>
            </thead>

            <tbody>
              {produtosBaixoEstoque.map((produto) => (
                <tr
                  key={produto.id}
                  className="border-b border-neutral-800"
                >
                  <td className="p-3">
                    {produto.nome}
                  </td>

                  <td className="p-3">
                    {produto.estoque}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>

      </div>
    </Layout>
  );
}