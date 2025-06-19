/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

interface Produto {
  idProduto: number;
  nome: string;
  preco: number;
}

interface ItemCarrinho {
  idProduto: number;
  nome: string;
  preco: number;
  quantidade: number;
}

export default function CriarPedido() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [itensCarrinho, setItensCarrinho] = useState<ItemCarrinho[]>([]);
  const [idCarrinho, setIdCarrinho] = useState<number | null>(null);
  const token = localStorage.getItem("token");
  const idCliente = localStorage.getItem("id_cliente");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const res = await axios.get("/produto");
        setProdutos(res.data);
      } catch (err) {
        console.error("Erro ao carregar produtos:", err);
      }
    };
    fetchProdutos();
  }, []);

  const criarCarrinho = async (): Promise<number | null> => {
    if (!idCliente) {
      console.error("idCliente não definido");
      return null;
    }
    try {
      const res = await axios.post(
        "/carrinho",
        {
          dataCriacao: new Date().toISOString().split("T")[0],
          idCliente: Number(idCliente),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const idCriado = res.data.idCarrinho;
      setIdCarrinho(idCriado);
      return idCriado;
    } catch (err: any) {
      console.error(
        "Erro ao criar carrinho:",
        err.response?.data || err.message
      );
      return null;
    }
  };

  const adicionarAoCarrinho = async (produto: Produto) => {
    try {
      let carrinhoId = idCarrinho;
      if (!carrinhoId) {
        carrinhoId = await criarCarrinho();
        if (!carrinhoId) {
          alert("Erro ao criar carrinho. Tente novamente.");
          return;
        }
      }
      await axios.post(
        "/itens-carrinho",
        {
          quantidade: 1,
          idProduto: produto.idProduto,
          idCarrinho: carrinhoId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const itemExistente = itensCarrinho.find(
        (item) => item.idProduto === produto.idProduto
      );
      if (itemExistente) {
        setItensCarrinho((prev) =>
          prev.map((item) =>
            item.idProduto === produto.idProduto
              ? { ...item, quantidade: item.quantidade + 1 }
              : item
          )
        );
      } else {
        setItensCarrinho((prev) => [
          ...prev,
          {
            idProduto: produto.idProduto,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1,
          },
        ]);
      }
    } catch (err) {
      console.error("Erro ao adicionar item ao carrinho:", err);
      alert("Erro ao adicionar item ao carrinho.");
    }
  };

  const favoritarProduto = async (produto: Produto) => {
    if (!token || !idCliente) {
      alert("Você precisa estar logado para favoritar.");
      return;
    }

    try {
      await axios.post(
        "/favoritos",
        {
          id_produto: produto.idProduto,
          id_cliente: Number(idCliente),
          data_adicao: new Date().toLocaleString('sv'),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(`Produto "${produto.nome}" favoritado com sucesso!`);
    } catch (err) {
      console.error("Erro ao favoritar produto:", err);
      alert("Erro ao favoritar produto. Tente novamente.");
    }
  };

  // Função para remover item do carrinho
  const removerDoCarrinho = async (idProduto: number) => {
    if (!idCarrinho) {
      alert("Carrinho não criado.");
      return;
    }
    try {
      // Supondo que sua API delete item pelo idProduto dentro do carrinho,
      // aqui uso idProduto como identificador, ajuste se precisar enviar outro ID
      await axios.delete(`/itens-carrinho/${idProduto}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setItensCarrinho((prev) =>
        prev.filter((item) => item.idProduto !== idProduto)
      );
    } catch (err) {
      console.error("Erro ao remover item do carrinho:", err);
      alert("Erro ao remover item do carrinho.");
    }
  };

  const handleFinalizarPedido = async () => {
    if (!idCarrinho || itensCarrinho.length === 0) {
      alert("Carrinho vazio ou não criado.");
      return;
    }
    const valorTotal = itensCarrinho.reduce(
      (acc, item) => acc + item.quantidade * item.preco,
      0
    );
    try {
      const res = await axios.post(
        "/pedido",
        {
          id_carrinho: idCarrinho,
          id_cliente: Number(idCliente),
          id_entregador: 1,
          id_status: 1,
          valor_total: valorTotal,
          data_pedido: new Date().toISOString().split("T")[0],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const idPedidoCriado = res.data.id_pedido;

      await axios.post(
        "/historico-compra",
        {
          id_cliente: Number(idCliente),
          id_pedido: idPedidoCriado,
          data_compra: new Date().toISOString().split("T")[0],
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Pedido e histórico criados com sucesso!");
      setItensCarrinho([]);
      setIdCarrinho(null);
      navigate(`/adicionar-endereco/${idPedidoCriado}`);
    } catch (err) {
      console.error("Erro ao finalizar pedido ou criar histórico:", err);
      alert("Erro ao finalizar pedido.");
    }
  };

  return (
    <div className="flex max-w-7xl mx-auto min-h-screen p-6 gap-6">
      {/* Produtos - esquerda */}
      <div className="flex-1 overflow-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Produtos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {produtos.map((produto) => (
            <div
              key={produto.idProduto}
              className="border rounded-lg p-4 flex flex-col justify-between shadow hover:shadow-lg transition"
            >
              <div>
                <h3 className="text-lg font-semibold mb-2">{produto.nome}</h3>
                <p className="text-gray-700 mb-4 font-medium">
                  R$ {produto.preco.toFixed(2)}
                </p>
              </div>
              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => adicionarAoCarrinho(produto)}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition flex-1"
                >
                  Adicionar ao Carrinho
                </button>
                <button
                  onClick={() => favoritarProduto(produto)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md font-semibold transition flex-1"
                >
                  Favoritar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carrinho - direita */}
      <aside className="w-1/3 border-l p-6 bg-white shadow-lg flex flex-col">
        <h2 className="text-xl font-bold mb-4">Carrinho</h2>

        {itensCarrinho.length === 0 ? (
          <p className="text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className="flex-grow overflow-auto space-y-3">
              {itensCarrinho.map((item) => (
                <li
                  key={item.idProduto}
                  className="flex justify-between items-center border-b pb-2"
                >
                  <div>
                    <p className="font-medium">{item.nome}</p>
                    <p className="text-sm text-gray-600">
                      {item.quantidade} x R$ {item.preco.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold">
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removerDoCarrinho(item.idProduto)}
                      className="text-red-600 hover:text-red-800 font-bold"
                      aria-label={`Remover ${item.nome} do carrinho`}
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-4 space-y-2">
              <p className="text-lg font-bold">
                Total: R${" "}
                {itensCarrinho
                  .reduce((acc, i) => acc + i.preco * i.quantidade, 0)
                  .toFixed(2)}
              </p>
              <button
                onClick={handleFinalizarPedido}
                className="bg-green-600 hover:bg-green-700 text-white w-full py-2 rounded font-semibold"
              >
                Finalizar Pedido
              </button>
            </div>
          </>
        )}

        <button
          onClick={() => navigate(`/historico/${idCliente}`)}
          className="bg-gray-500 hover:bg-gray-600 text-white w-full py-2 rounded font-semibold"
        >
          Ver Histórico de Pedidos
        </button>

        <button
          onClick={() => navigate(`/favoritos/cliente/${idCliente}`)}
          className="bg-purple-600 hover:bg-purple-700 text-white w-full py-2 rounded font-semibold"
        >
          Ver meus Favoritados
        </button>
      </aside>
    </div>
  );
}
