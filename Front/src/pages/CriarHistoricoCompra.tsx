// src/pages/CriarHistoricoCompra.tsx
import { useState } from "react";
import axios from "../api/axios";

export default function CriarHistoricoCompra() {
  const [idCliente, setIdCliente] = useState("");
  const [idPedido, setIdPedido] = useState("");
  const [dataCompra, setDataCompra] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setMessage("");
    setError("");

    try {
      const response = await axios.post("/historico-compra", {
        id_cliente: Number(idCliente),
        id_pedido: Number(idPedido),
        data_compra: dataCompra,
      });

      setMessage("Histórico criado com sucesso!");
      setIdCliente("");
      setIdPedido("");
      setDataCompra("");
    } catch (err) {
      setError("Erro ao criar histórico.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Criar Histórico de Compra</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">ID Cliente</label>
          <input
            type="number"
            value={idCliente}
            onChange={(e) => setIdCliente(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">ID Pedido</label>
          <input
            type="number"
            value={idPedido}
            onChange={(e) => setIdPedido(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Data da Compra</label>
          <input
            type="date"
            value={dataCompra}
            onChange={(e) => setDataCompra(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Criar Histórico
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
