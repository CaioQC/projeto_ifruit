// src/pages/Carrinho.tsx
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Carrinho() {
  const [dataCriacao, setDataCriacao] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const idCliente = localStorage.getItem("id_cliente");

    if (!token || !idCliente) {
      alert("Você precisa estar logado.");
      return;
    }

    try {
      await axios.post(
        "/carrinho",
        {
          dataCriacao,
          idCliente: Number(idCliente),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Carrinho criado com sucesso!");
      navigate("/produtos"); // ou outra tela que desejar
    } catch (err) {
      console.error(err);
      alert("Erro ao criar carrinho");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Criar Carrinho</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Data de Criação</label>
          <input
            type="date"
            value={dataCriacao}
            onChange={(e) => setDataCriacao(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Criar Carrinho
        </button>
      </form>
    </div>
  );
}
