"use client";

import { useMemo, useState } from "react";

type Cliente = {
  id: number;
  nome: string;
};

type Produto = {
  id: number;
  nome: string;
  precoVenda: number;
  estoque: number;
  unidade: string;
};

type ItemVenda = {
  produtoId: number;
  nome: string;
  preco: number;
  quantidade: number;
  total: number;
};

export default function CaixaClient({
  clientes,
  produtos,
  finalizarVenda,
}: {
  clientes: Cliente[];
  produtos: Produto[];
  finalizarVenda: (formData: FormData) => void;
}) {
  const [clienteId, setClienteId] = useState("");
  const [produtoId, setProdutoId] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [formaPgto, setFormaPgto] = useState("Dinheiro");
  const [valorPago, setValorPago] = useState("");
  const [itens, setItens] = useState<ItemVenda[]>([]);

  const clienteSelecionado = clientes.find(
    (cliente) => cliente.id === Number(clienteId)
  );

  const totalVenda = useMemo(() => {
    return itens.reduce((total, item) => total + item.total, 0);
  }, [itens]);

  const troco = Number(valorPago || 0) - totalVenda;

  function formatarMoeda(valor: number) {
    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function adicionarItem() {
    const produto = produtos.find((p) => p.id === Number(produtoId));
    const qtd = Number(quantidade || 0);

    if (!produto || qtd <= 0) return;

    const total = produto.precoVenda * qtd;

    setItens((itensAtuais) => [
      ...itensAtuais,
      {
        produtoId: produto.id,
        nome: produto.nome,
        preco: produto.precoVenda,
        quantidade: qtd,
        total,
      },
    ]);

    setProdutoId("");
    setQuantidade("");
  }

  function removerItem(index: number) {
    setItens((itensAtuais) => itensAtuais.filter((_, i) => i !== index));
  }

  function imprimirCupom() {
    if (itens.length === 0) return;

    const janela = window.open("", "_blank", "width=420,height=700");

    if (!janela) return;

    const data = new Date().toLocaleString("pt-BR");

    const linhasItens = itens
      .map(
        (item) => `
          <tr>
            <td class="produto">${item.nome}</td>
            <td class="qtd">${item.quantidade}</td>
            <td class="valor">${formatarMoeda(item.preco)}</td>
            <td class="valor">${formatarMoeda(item.total)}</td>
          </tr>
        `
      )
      .join("");

    janela.document.write(`
      <html>
        <head>
          <title>Cupom - Açougue Maracanã</title>

          <style>
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 20px;
              background: #f3f3f3;
              color: #111;
              font-family: Arial, Helvetica, sans-serif;
            }

            .cupom {
              width: 340px;
              margin: 0 auto;
              background: #fff;
              padding: 18px;
              border: 1px solid #ddd;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            }

            .topo {
              text-align: center;
              border-bottom: 1px dashed #111;
              padding-bottom: 12px;
              margin-bottom: 12px;
            }

            .logo {
              width: 58px;
              height: 58px;
              border-radius: 50%;
              object-fit: cover;
              margin-bottom: 8px;
            }

            .topo h1 {
              margin: 0;
              font-size: 21px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }

            .topo p {
              margin: 4px 0;
              font-size: 12px;
            }

            .info {
              font-size: 12px;
              border-bottom: 1px dashed #111;
              padding-bottom: 10px;
              margin-bottom: 10px;
            }

            .info div {
              display: flex;
              justify-content: space-between;
              margin-bottom: 4px;
            }

            table {
              width: 100%;
              border-collapse: collapse;
              font-size: 11px;
            }

            th {
              text-align: left;
              border-bottom: 1px solid #111;
              padding: 5px 0;
              font-size: 11px;
            }

            td {
              padding: 6px 0;
              border-bottom: 1px dashed #ccc;
              vertical-align: top;
            }

            .produto {
              width: 42%;
            }

            .qtd {
              text-align: center;
              width: 14%;
            }

            .valor {
              text-align: right;
              white-space: nowrap;
            }

            .totais {
              margin-top: 14px;
              border-top: 1px dashed #111;
              padding-top: 12px;
              font-size: 13px;
            }

            .linha {
              display: flex;
              justify-content: space-between;
              margin-bottom: 7px;
            }

            .linha.total {
              font-size: 17px;
              font-weight: bold;
              border-top: 1px solid #111;
              padding-top: 10px;
              margin-top: 8px;
            }

            .rodape {
              text-align: center;
              margin-top: 14px;
              border-top: 1px dashed #111;
              padding-top: 12px;
              font-size: 12px;
            }

            .botoes {
              width: 340px;
              margin: 14px auto 0;
              display: flex;
              gap: 8px;
            }

            button {
              flex: 1;
              padding: 10px;
              border: none;
              border-radius: 8px;
              background: #991b1b;
              color: white;
              font-weight: bold;
              cursor: pointer;
            }

            button:hover {
              background: #7f1d1d;
            }

            @media print {
              body {
                background: white;
                padding: 0;
              }

              .cupom {
                width: 80mm;
                box-shadow: none;
                border: none;
                padding: 8px;
              }

              .botoes {
                display: none;
              }
            }
          </style>
        </head>

        <body>
          <div class="cupom">
            <div class="topo">
              <img src="/logo-maracana.png" class="logo" />
              <h1>Açougue Maracanã</h1>
              <p>Sistema de Gestão Comercial</p>
              <p>Comprovante de Venda</p>
            </div>

            <div class="info">
              <div>
                <span>Data:</span>
                <strong>${data}</strong>
              </div>

              <div>
                <span>Cliente:</span>
                <strong>${clienteSelecionado?.nome || "Não informado"}</strong>
              </div>

              <div>
                <span>Pagamento:</span>
                <strong>${formaPgto}</strong>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Produto</th>
                  <th class="qtd">Qtd</th>
                  <th class="valor">Unit.</th>
                  <th class="valor">Total</th>
                </tr>
              </thead>

              <tbody>
                ${linhasItens}
              </tbody>
            </table>

            <div class="totais">
              <div class="linha">
                <span>Valor pago:</span>
                <strong>${formatarMoeda(Number(valorPago || 0))}</strong>
              </div>

              <div class="linha">
                <span>Troco:</span>
                <strong>${formatarMoeda(troco > 0 ? troco : 0)}</strong>
              </div>

              <div class="linha total">
                <span>Total:</span>
                <span>${formatarMoeda(totalVenda)}</span>
              </div>
            </div>

            <div class="rodape">
              <p>Obrigado pela preferência!</p>
              <p>Volte sempre.</p>
              <p>Documento não fiscal</p>
            </div>
          </div>

          <div class="botoes">
            <button onclick="window.print()">Imprimir Cupom</button>
            <button onclick="window.close()">Fechar</button>
          </div>
        </body>
      </html>
    `);

    janela.document.close();
  }

  return (
    <form action={finalizarVenda}>
      <input type="hidden" name="clienteId" value={clienteId} />
      <input type="hidden" name="formaPgto" value={formaPgto} />
      <input type="hidden" name="valorPago" value={valorPago} />
      <input type="hidden" name="itens" value={JSON.stringify(itens)} />

      <div className="bg-neutral-900 border border-yellow-700/40 rounded-2xl p-6">
        <h2 className="text-2xl font-bold mb-4">Nova Venda</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <select
            className="input"
            value={clienteId}
            onChange={(e) => setClienteId(e.target.value)}
          >
            <option value="">Cliente não informado</option>
            {clientes.map((cliente) => (
              <option key={cliente.id} value={cliente.id}>
                {cliente.nome}
              </option>
            ))}
          </select>

          <select
            className="input"
            value={produtoId}
            onChange={(e) => setProdutoId(e.target.value)}
          >
            <option value="">Produto</option>
            {produtos.map((produto) => (
              <option key={produto.id} value={produto.id}>
                {produto.nome} - {formatarMoeda(produto.precoVenda)} - estoque:{" "}
                {produto.estoque} {produto.unidade}
              </option>
            ))}
          </select>

          <input
            className="input"
            placeholder="Quantidade"
            type="number"
            step="0.01"
            value={quantidade}
            onChange={(e) => setQuantidade(e.target.value)}
          />

          <button type="button" onClick={adicionarItem} className="btn-primary">
            Adicionar Item
          </button>
        </div>

        <div className="overflow-auto mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-neutral-700">
                <th className="p-3 text-left">Produto</th>
                <th className="p-3 text-left">Qtd</th>
                <th className="p-3 text-left">Preço</th>
                <th className="p-3 text-left">Total</th>
                <th className="p-3 text-left">Ação</th>
              </tr>
            </thead>

            <tbody>
              {itens.map((item, index) => (
                <tr key={index} className="border-b border-neutral-800">
                  <td className="p-3">{item.nome}</td>
                  <td className="p-3">{item.quantidade}</td>
                  <td className="p-3">{formatarMoeda(item.preco)}</td>
                  <td className="p-3">{formatarMoeda(item.total)}</td>
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => removerItem(index)}
                      className="btn-danger"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <select
            className="input"
            value={formaPgto}
            onChange={(e) => setFormaPgto(e.target.value)}
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Pix">Pix</option>
            <option value="Cartão">Cartão</option>
            <option value="Fiado">Fiado</option>
          </select>

          <input
            className="input"
            placeholder="Valor pago"
            type="number"
            step="0.01"
            value={valorPago}
            onChange={(e) => setValorPago(e.target.value)}
          />

          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
            <p className="text-neutral-400">Total</p>
            <p className="text-2xl font-bold text-yellow-400">
              {formatarMoeda(totalVenda)}
            </p>
          </div>

          <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4">
            <p className="text-neutral-400">Troco</p>
            <p className="text-2xl font-bold text-green-400">
              {formatarMoeda(troco > 0 ? troco : 0)}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button
            type="submit"
            className="btn-primary"
            disabled={itens.length === 0}
          >
            Finalizar Venda
          </button>

          <button type="button" onClick={imprimirCupom} className="btn-primary">
            Imprimir Cupom
          </button>
        </div>
      </div>
    </form>
  );
}