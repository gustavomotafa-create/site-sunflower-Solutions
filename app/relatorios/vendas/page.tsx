import Layout from "@/components/Layout";
import { prisma } from "@/lib/prisma";

export default async function RelatorioVendas({
  searchParams,
}: {
  searchParams: Promise<{
    inicio?: string;
    fim?: string;
  }>;
}) {
  const params = await searchParams;

  const inicio = params.inicio;
  const fim = params.fim;

  const where =
    inicio && fim
      ? {
          criadoEm: {
            gte: new Date(`${inicio}T00:00:00`),
            lte: new Date(`${fim}T23:59:59`),
          },
        }
      : {};

  const vendas = await prisma.venda.findMany({
    where,
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

  const totalVendido = vendas.reduce(
    (total, venda) => total + venda.total,
    0
  );

  const quantidadeVendas = vendas.length;

  const ticketMedio =
    quantidadeVendas > 0 ? totalVendido / quantidadeVendas : 0;

  const vendasDinheiro = vendas.filter(
    (venda) => venda.formaPgto === "Dinheiro"
  ).length;

  const vendasPix = vendas.filter(
    (venda) => venda.formaPgto === "Pix"
  ).length;

  const vendasCartao = vendas.filter(
    (venda) => venda.formaPgto === "Cartão"
  ).length;

  const vendasFiado = vendas.filter(
    (venda) => venda.formaPgto === "Fiado"
  ).length;

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">Relatório de Vendas</h1>

        <p className="text-neutral-400 mb-8">
          Histórico completo de vendas realizadas no sistema.
        </p>

        <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6 mb-8">
          <form className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="date"
              name="inicio"
              defaultValue={inicio}
              className="input"
            />

            <input
              type="date"
              name="fim"
              defaultValue={fim}
              className="input"
            />

            <button type="submit" className="btn-primary">
              Filtrar
            </button>

            <a
              href="/relatorios/vendas"
              className="btn-danger text-center flex items-center justify-center"
            >
              Limpar
            </a>
          </form>

          <div className="flex gap-3 mt-4 flex-wrap">
            <a
              href={`/relatorios/vendas?inicio=${
                new Date().toISOString().split("T")[0]
              }&fim=${new Date().toISOString().split("T")[0]}`}
              className="btn-primary"
            >
              Hoje
            </a>

            <a
              href={`/relatorios/vendas?inicio=${
                new Date().getFullYear()
              }-${String(new Date().getMonth() + 1).padStart(
                2,
                "0"
              )}-01&fim=${new Date().toISOString().split("T")[0]}`}
              className="btn-primary"
            >
              Este mês
            </a>

            <a
              href="/relatorios/vendas"
              className="btn-primary"
            >
              Todas
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Total vendido
            </h2>

            <p className="text-4xl font-bold mt-4">
              {totalVendido.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Quantidade de vendas
            </h2>

            <p className="text-4xl font-bold mt-4">
              {quantidadeVendas}
            </p>
          </div>

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-xl font-bold text-yellow-400">
              Ticket médio
            </h2>

            <p className="text-4xl font-bold mt-4">
              {ticketMedio.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-yellow-400">Dinheiro</h2>
            <p className="text-3xl font-bold mt-3">{vendasDinheiro}</p>
          </div>

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-yellow-400">Pix</h2>
            <p className="text-3xl font-bold mt-3">{vendasPix}</p>
          </div>

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-yellow-400">Cartão</h2>
            <p className="text-3xl font-bold mt-3">{vendasCartao}</p>
          </div>

          <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
            <h2 className="text-lg font-bold text-yellow-400">Fiado</h2>
            <p className="text-3xl font-bold mt-3">{vendasFiado}</p>
          </div>
        </div>

        <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">Vendas realizadas</h2>

          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="p-3 text-left">Código</th>
                <th className="p-3 text-left">Data</th>
                <th className="p-3 text-left">Cliente</th>
                <th className="p-3 text-left">Produto</th>
                <th className="p-3 text-left">Qtd</th>
                <th className="p-3 text-left">Pagamento</th>
                <th className="p-3 text-left">Total</th>
              </tr>
            </thead>

            <tbody>
              {vendas.map((venda) => {
                const item = venda.itens[0];

                return (
                  <tr key={venda.id} className="border-b border-neutral-800">
                    <td className="p-3">{venda.id}</td>

                    <td className="p-3">
                      {venda.criadoEm.toLocaleDateString("pt-BR")}
                    </td>

                    <td className="p-3">{venda.cliente?.nome || "-"}</td>

                    <td className="p-3">{item?.produto?.nome || "-"}</td>

                    <td className="p-3">{item?.quantidade || 0}</td>

                    <td className="p-3">{venda.formaPgto}</td>

                    <td className="p-3">
                      {venda.total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
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