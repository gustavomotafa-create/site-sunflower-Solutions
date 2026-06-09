import MenuCard from "@/components/MenuCard";
import { prisma } from "@/lib/prisma";

export default async function Home() {
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
    <div className="min-h-screen bg-neutral-950 text-white">

      <div className="bg-red-800 border-b-4 border-yellow-500">
        <div className="max-w-7xl mx-auto px-6 py-6 flex items-center gap-4">
          <img
            src="/logo-maracana.png"
            alt="Maracanã"
            className="w-20 h-20 rounded-full"
          />

          <div>
            <h1 className="text-4xl font-bold">
              Açougue Maracanã
            </h1>

            <p className="text-yellow-300">
              Sistema de Gestão Comercial
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">

        {produtosBaixoEstoque.length > 0 && (
          <div className="mb-8 bg-red-950 border border-red-500 rounded-2xl p-6">
            <h2 className="text-2xl font-bold text-red-400 mb-4">
              ⚠️ Alerta de Estoque Baixo
            </h2>

            <div className="space-y-2">
              {produtosBaixoEstoque.map((produto) => (
                <div
                  key={produto.id}
                  className="flex justify-between bg-neutral-900 rounded-xl p-3"
                >
                  <span>{produto.nome}</span>

                  <span className="font-bold text-yellow-400">
                    {produto.estoque} {produto.unidade}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <h2 className="text-3xl font-bold mb-8 text-center">
          Menu Principal
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          <MenuCard
            title="Caixa"
            icon="💰"
            href="/caixa"
          />

          <MenuCard
            title="Clientes"
            icon="👥"
            href="/clientes"
          />

          <MenuCard
            title="Produtos"
            icon="📦"
            href="/produtos"
          />

          <MenuCard
            title="Compras"
            icon="🛒"
            href="/compras"
          />

          <MenuCard
            title="Relatório de Estoque"
            icon="📋"
            href="/relatorios/estoque"
          />

          <MenuCard
            title="Relatório de Vendas"
            icon="📈"
            href="/relatorios/vendas"
          />

          <MenuCard
            title="Pesquisa de Produtos"
            icon="🔎"
            href="/relatorios/produtos"
          />

          <MenuCard
            title="Usuários"
            icon="👨‍💼"
            href="/usuarios"
          />

        </div>
      </div>

    </div>
  );
}