// src/pages/AdicionarPagamento.tsx
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdicionarPagamento() {
  const [idStatus, setIdStatus] = useState(1);
  const [idPedido, setIdPedido] = useState("");
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [valor, setValor] = useState("");
  const [dataPagamento, setDataPagamento] = useState("");
  const navigate = useNavigate();

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
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Adicionar Pagamento</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Status do Pagamento</label>
          <select
            value={idStatus}
            onChange={(e) => setIdStatus(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value={1}>Pendente</option>
            <option value={2}>Pago</option>
          </select>
        </div>
        <div>
          <label>ID do Pedido</label>
          <input
            type="number"
            value={idPedido}
            onChange={(e) => setIdPedido(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>Método de Pagamento</label>
          <input
            type="text"
            value={metodoPagamento}
            onChange={(e) => setMetodoPagamento(e.target.value)}
            placeholder="pix, cartão, boleto..."
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>Valor</label>
          <input
            type="number"
            step="0.01"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>Data do Pagamento</label>
          <input
            type="date"
            value={dataPagamento}
            onChange={(e) => setDataPagamento(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Adicionar Pagamento
        </button>
      </form>
    </div>
  );
}
