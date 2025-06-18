// src/pages/CriarPedido.tsx
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CriarPedido() {
  const [idCarrinho, setIdCarrinho] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [idEntregador, setIdEntregador] = useState("");
  const [idStatus, setIdStatus] = useState(1);
  const [valorTotal, setValorTotal] = useState("");
  const [dataPedido, setDataPedido] = useState("");
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
        "/pedido",
        {
          id_carrinho: Number(idCarrinho),
          id_cliente: Number(idCliente),
          id_entregador: Number(idEntregador),
          id_status: Number(idStatus),
          valor_total: Number(valorTotal),
          data_pedido: dataPedido,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Pedido criado com sucesso!");
      navigate("/historico-compra"); // ou outra tela
    } catch (error) {
      console.error(error);
      alert("Erro ao criar pedido.");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Criar Pedido</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>ID do Carrinho</label>
          <input
            type="number"
            value={idCarrinho}
            onChange={(e) => setIdCarrinho(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>ID do Cliente</label>
          <input
            type="number"
            value={idCliente}
            onChange={(e) => setIdCliente(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>ID do Entregador</label>
          <input
            type="number"
            value={idEntregador}
            onChange={(e) => setIdEntregador(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>Status do Pedido</label>
          <select
            value={idStatus}
            onChange={(e) => setIdStatus(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
            required
          >
            <option value={1}>Pendente</option>
            <option value={2}>Entregue</option>
          </select>
        </div>
        <div>
          <label>Valor Total</label>
          <input
            type="number"
            step="0.01"
            value={valorTotal}
            onChange={(e) => setValorTotal(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label>Data do Pedido</label>
          <input
            type="date"
            value={dataPedido}
            onChange={(e) => setDataPedido(e.target.value)}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
        >
          Criar Pedido
        </button>
      </form>
    </div>
  );
}
