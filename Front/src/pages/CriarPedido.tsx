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
          data_adicao: new Date().toLocaleString("sv"),
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
    <div className="pagina">
      {/* Produtos */}
      <section className="secao-produtos">
        <h2 className="titulo-secao azul">Nossos Produtos</h2>

        <div className="grid-produtos">
          {produtos.map((produto) => (
            <div key={produto.idProduto} className="card-produto">
              <div>
                <h3 className="titulo-produto">{produto.nome}</h3>
                <p className="preco-produto">R$ {produto.preco.toFixed(2)}</p>
              </div>
              <div className="botoes-produto">
                <button
                  onClick={() => adicionarAoCarrinho(produto)}
                  className="btn btn-primary"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => favoritarProduto(produto)}
                  className="btn btn-yellow"
                >
                  Favoritar
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Carrinho */}
      <aside className="carrinho">
        <h2 className="titulo-secao verde">Carrinho</h2>

        {itensCarrinho.length === 0 ? (
          <p className="carrinho-vazio">Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className="lista-carrinho">
              {itensCarrinho.map((item) => (
                <li key={item.idProduto} className="item-carrinho">
                  <div>
                    <p className="nome-produto">{item.nome}</p>
                    <p className="detalhes-produto">
                      {item.quantidade} x R$ {item.preco.toFixed(2)}
                    </p>
                  </div>
                  <div className="info-direita">
                    <span className="subtotal">
                      R$ {(item.preco * item.quantidade).toFixed(2)}
                    </span>
                    <button
                      onClick={() => removerDoCarrinho(item.idProduto)}
                      className="btn-remove"
                    >
                      ×
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="total-carrinho">
              <p className="valor-total">
                Total: R${" "}
                {itensCarrinho
                  .reduce((acc, i) => acc + i.preco * i.quantidade, 0)
                  .toFixed(2)}
              </p>
              <button onClick={handleFinalizarPedido} className="btn btn-green">
                Finalizar Pedido
              </button>
            </div>
          </>
        )}

        <div className="botoes-secundarios">
          <button
            onClick={() => navigate(`/historico/${idCliente}`)}
            className="btn btn-gray"
          >
            Ver Histórico de Pedidos
          </button>
          <button
            onClick={() => navigate(`/favoritos/cliente/${idCliente}`)}
            className="btn btn-purple"
          >
            Ver Favoritos
          </button>
        </div>
      </aside>
    </div>
  );
}
