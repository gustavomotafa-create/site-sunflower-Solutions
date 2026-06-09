"use client";

import { useState } from "react";

type Produto = {
  id: number;
  nome: string;
  fornecedor: string;
  precoCompra: number;
  precoVenda: number;
  estoque: number;
};

export default function PesquisaProdutosClient({
  produtos,
}: {
  produtos: Produto[];
}) {
  const [busca, setBusca] = useState("");

  const produtosFiltrados = produtos.filter((produto) => {
    const termo = busca.toLowerCase();

    return (
      produto.nome.toLowerCase().includes(termo) ||
      produto.fornecedor.toLowerCase().includes(termo)
    );
  });

  return (
    <>
      <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6 mb-6">
        <input
          type="text"
          placeholder="Pesquisar por produto ou fornecedor..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="input w-full"
        />
      </div>

      <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
        {produtosFiltrados.length === 0 ? (
          <p className="text-neutral-400">
            Nenhum produto encontrado.
          </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="p-3 text-left">Código</th>
                <th className="p-3 text-left">Produto</th>
                <th className="p-3 text-left">Fornecedor</th>
                <th className="p-3 text-left">Compra</th>
                <th className="p-3 text-left">Venda</th>
                <th className="p-3 text-left">Lucro</th>
                <th className="p-3 text-left">Estoque</th>
              </tr>
            </thead>

            <tbody>
              {produtosFiltrados.map((produto) => {
                const lucro = produto.precoVenda - produto.precoCompra;

                return (
                  <tr key={produto.id} className="border-b border-neutral-800">
                    <td className="p-3">{produto.id}</td>
                    <td className="p-3">{produto.nome}</td>
                    <td className="p-3">{produto.fornecedor}</td>
                    <td className="p-3">
                      {produto.precoCompra.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="p-3">
                      {produto.precoVenda.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="p-3 text-green-400">
                      {lucro.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>
                    <td className="p-3">{produto.estoque}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}