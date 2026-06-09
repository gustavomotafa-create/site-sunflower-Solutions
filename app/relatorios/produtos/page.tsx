import Layout from "@/components/Layout";
import PesquisaProdutosClient from "@/components/PesquisaProdutosClient";
import { prisma } from "@/lib/prisma";

export default async function PesquisaProdutos() {
  const produtosBanco = await prisma.produto.findMany({
    include: {
      fornecedor: true,
    },
    orderBy: {
      nome: "asc",
    },
  });

  const produtos = produtosBanco.map((produto) => ({
    id: produto.id,
    nome: produto.nome,
    fornecedor: produto.fornecedor?.nome || "-",
    precoCompra: produto.precoCompra,
    precoVenda: produto.precoVenda,
    estoque: produto.estoque,
  }));

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">
          Pesquisa de Produtos
        </h1>

        <p className="text-neutral-400 mb-8">
          Consulta rápida de produtos cadastrados.
        </p>

        <PesquisaProdutosClient produtos={produtos} />
      </div>
    </Layout>
  );
}