import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AdicionarPagamento() {
  const { idPedido } = useParams();
  const [idStatus, setIdStatus] = useState(1);
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [valor, setValor] = useState(""); // valor total do pedido
  const [dataPagamento, setDataPagamento] = useState(""); // data atual
  const navigate = useNavigate();

  useEffect(() => {
    // Pega a data atual formatada yyyy-MM-dd
    const hoje = new Date().toISOString().split("T")[0];
    setDataPagamento(hoje);

    async function fetchPedido() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`/pedido/${idPedido}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Ajuste conforme o formato do seu retorno da API
        if (res.data && res.data.valor_total !== undefined) {
          setValor(res.data.valor_total.toFixed(2));
        } else {
          alert("Não foi possível obter o valor do pedido.");
        }
      } catch (error) {
        console.error("Erro ao buscar pedido:", error);
        alert("Erro ao carregar dados do pedido.");
      }
    }

    if (idPedido) {
      fetchPedido();
    }
  }, [idPedido]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado.");
      return;
    }

    try {
      await axios.post(
        "/pagamento",
        {
          id_status: Number(idStatus),
          id_pedido: Number(idPedido),
          metodo_pagamento: metodoPagamento,
          valor: Number(valor),
          data_pagamento: dataPagamento,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Pagamento adicionado com sucesso!");
      navigate("/pedido/" + idPedido);
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar pagamento.");
    }
  };

  return (
    <div className="signup-form">
      <h1>Adicionar Pagamento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Status do Pagamento</label>
          <select
            value={idStatus}
            onChange={(e) => setIdStatus(Number(e.target.value))}
            className="input"
            required
          >
            <option value={1}>Pendente</option>
            <option value={2}>Pago</option>
          </select>
        </div>

        <div>
          <label>Método de Pagamento</label>
          <input
            type="text"
            value={metodoPagamento}
            onChange={(e) => setMetodoPagamento(e.target.value)}
            placeholder="pix, cartão, boleto..."
            className="input"
            required
          />
        </div>

        <div>
          <label>Valor</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            readOnly
            className="input"
          />
        </div>

        <div>
          <label>Data do Pagamento</label>
          <input
            type="date"
            value={dataPagamento}
            readOnly
            className="input"
          />
        </div>

        <button type="submit" className="submit-button">
          Adicionar Pagamento
        </button>
      </form>
    </div>
  );
}
