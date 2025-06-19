/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

interface Produto {
  nome: string;
}

interface ItemCarrinho {
  idItem: number;
  produto: Produto;
  quantidade: number;
  subtotal: number;
}

interface Carrinho {
  idCarrinho: number;
  dataCriacao: string;
  itens: ItemCarrinho[];
}

interface Pedido {
  id_pedido: number;
  valor_total: number;
  data_pedido: string;
  carrinho: Carrinho;
}

export default function Historico() {
  const { id } = useParams<{ id: string }>();
  const [historico, setHistorico] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Você precisa estar logado.");
      setLoading(false);
      return;
    }

    const fetchHistorico = async () => {
      try {
        const response = await axios.get(`/pedido/usuario/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setHistorico(response.data);
      } catch (err) {
        setError("Erro ao buscar histórico.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistorico();
  }, [id]);

  if (loading) return <p className="loading-text">Carregando histórico...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (historico.length === 0)
    return <p className="error-text">Nenhum histórico encontrado.</p>;

  return (
    <div className="historico-container">
      <h1 className="titulo-historico">Histórico de Pedidos</h1>

      <div className="scroll-wrapper">
        <ul className="lista-pedidos">
          {historico.map((item) => (
            <li key={item.id_pedido} className="card-pedido">
              <div className="cabecalho-pedido">
                <h2 className="numero-pedido">Pedido #{item.id_pedido}</h2>
                <span className="data-pedido">
                  {new Date(item.data_pedido).toLocaleDateString()}
                </span>
              </div>

              <p className="valor-total">
                Valor total: R$ {item.valor_total.toFixed(2)}
              </p>

              <div className="produtos-pedido">
                <h3 className="titulo-produtos">Produtos:</h3>
                <ul className="lista-produtos">
                  {item.carrinho.itens.map((produto) => (
                    <li key={produto.idItem} className="item-produto">
                      <p>
                        <strong>Produto:</strong> {produto.produto.nome}
                      </p>
                      <p>
                        <strong>Quantidade:</strong> {produto.quantidade}
                      </p>
                      <p>
                        <strong>Subtotal:</strong> R${" "}
                        {produto.subtotal.toFixed(2)}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
