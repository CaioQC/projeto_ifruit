/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api/axios";

interface Pedido {
  id_pedido: number;
  cliente: { id: number; nome: string };
  carrinho: { idCarrinho: number };
  entregador: { id: number; nome: string };
  status: { id_status: number; estado: string };
  valor_total: number;
  data_pedido: string;
}

export default function VisualizarPedido() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Você precisa estar logado.");
      setLoading(false);
      return;
    }

    const fetchPedido = async () => {
      try {
        const response = await axios.get(`/pedido/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPedido(response.data);
      } catch (err) {
        setError("Erro ao buscar pedido.");
      } finally {
        setLoading(false);
      }
    };

    fetchPedido();
  }, [id]);

  if (loading) return <p className="loading-text">Carregando pedido...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (!pedido) return <p className="error-text">Pedido não encontrado.</p>;

  return (
    <div className="pedido-container">
      <h1>Pedido #{pedido.id_pedido}</h1>
      <ul>
        <li><strong>Carrinho:</strong> #{pedido.carrinho.idCarrinho}</li>
        <li><strong>Cliente:</strong> {pedido.cliente.nome} (ID {pedido.cliente.id})</li>
        <li><strong>Entregador:</strong> {pedido.entregador.nome} (ID {pedido.entregador.id})</li>
        <li><strong>Status:</strong> {pedido.status.estado}</li>
        <li><strong>Valor Total:</strong> R$ {pedido.valor_total.toFixed(2)}</li>
        <li><strong>Data do Pedido:</strong> {new Date(pedido.data_pedido).toLocaleDateString()}</li>
      </ul>
      <button
        className="history-button"
        onClick={() => navigate(`/historico/${pedido.cliente.id}`)}
      >
        Visualizar meu histórico de pedidos
      </button>
    </div>
  );
}
