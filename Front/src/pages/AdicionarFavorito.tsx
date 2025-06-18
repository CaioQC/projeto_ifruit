// src/pages/AdicionarFavorito.tsx
import { useState } from "react";
import axios from "../api/axios";

export default function AdicionarFavorito() {
  const [idProduto, setIdProduto] = useState("");
  const [idCliente, setIdCliente] = useState("");
  const [dataAdicao, setDataAdicao] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Você precisa estar logado para adicionar favoritos.");
      return;
    }

    try {
      await axios.post(
        "/favoritos",
        {
          id_produto: Number(idProduto),
          id_cliente: Number(idCliente),
          data_adicao: dataAdicao,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("Produto adicionado aos favoritos com sucesso!");
      setIdProduto("");
      setIdCliente("");
      setDataAdicao("");
    } catch {
      setError("Erro ao adicionar favorito.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Adicionar Produto aos Favoritos</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold">ID do Produto</label>
          <input
            type="number"
            value={idProduto}
            onChange={(e) => setIdProduto(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">ID do Cliente</label>
          <input
            type="number"
            value={idCliente}
            onChange={(e) => setIdCliente(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold">Data de Adição</label>
          <input
            type="date"
            value={dataAdicao}
            onChange={(e) => setDataAdicao(e.target.value)}
            required
            className="w-full border p-2 rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar
        </button>
      </form>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}
    </div>
  );
}
