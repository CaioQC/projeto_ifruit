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
  if (historico.length === 0) return <p className="error-text">Nenhum histórico encontrado.</p>;

  return (
    <div className="historico-container">
      <h1>Histórico de Pedidos</h1>
      <ul>
        {historico.map((item) => (
          <li key={item.id_pedido}>
            <p><strong>Pedido #{item.id_pedido}</strong></p>
            <p>Valor total: R$ {item.valor_total.toFixed(2)}</p>
            <p>Data: {new Date(item.data_pedido).toLocaleDateString()}</p>

            <h4>Produtos:</h4>
            <ul>
              {item.carrinho.itens.map((produto) => (
                <li key={produto.idItem}>
                  <p>Produto: {produto.produto.nome}</p>
                  <p>Quantidade: {produto.quantidade}</p>
                  <p>Subtotal: R$ {produto.subtotal.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
