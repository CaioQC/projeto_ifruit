// src/pages/VisualizarPedido.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

interface Pedido {
  id: number;
  id_carrinho: number;
  id_cliente: number;
  id_entregador: number;
  id_status: number;
  valor_total: number;
  data_pedido: string;
  // Adicione outros campos conforme seu backend
}

export default function VisualizarPedido() {
  const { id } = useParams<{ id: string }>();
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

  if (loading) return <p>Carregando pedido...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!pedido) return <p>Pedido não encontrado.</p>;

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Detalhes do Pedido #{pedido.id}</h1>
      <ul className="space-y-2">
        <li><strong>ID Carrinho:</strong> {pedido.id_carrinho}</li>
        <li><strong>ID Cliente:</strong> {pedido.id_cliente}</li>
        <li><strong>ID Entregador:</strong> {pedido.id_entregador}</li>
        <li><strong>Status:</strong> {pedido.id_status === 1 ? "Pendente" : "Entregue"}</li>
        <li><strong>Valor Total:</strong> R$ {pedido.valor_total.toFixed(2)}</li>
        <li><strong>Data do Pedido:</strong> {pedido.data_pedido}</li>
      </ul>
    </div>
  );
}
