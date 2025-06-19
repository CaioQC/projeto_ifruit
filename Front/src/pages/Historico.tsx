/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

interface HistoricoItem {
  id_historico_compra: number;
  cliente: { id: number; nome: string };
  pedido: {
    id_pedido: number;
    valor_total: number;
    data_pedido: string;
  };
}

export default function Historico() {
  const { id } = useParams<{ id: string }>();
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
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
        const response = await axios.get(`/historico-compra/usuario/${id}`, {
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
          <li key={item.id_historico_compra}>
            <p><strong>Pedido #{item.pedido.id_pedido}</strong></p>
            <p>Valor: R$ {item.pedido.valor_total.toFixed(2)}</p>
            <p>Data: {new Date(item.pedido.data_pedido).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
