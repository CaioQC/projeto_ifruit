// src/pages/AdicionarItem.tsx
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function AdicionarItem() {
  const [quantidade, setQuantidade] = useState(1);
  const [idProduto, setIdProduto] = useState("");
  const [idCarrinho, setIdCarrinho] = useState("");
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
        "/itens-carrinho",
        {
          quantidade: Number(quantidade),
          idProduto: Number(idProduto),
          idCarrinho: Number(idCarrinho),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Item adicionado ao carrinho com sucesso!");
      navigate("/produtos");
    } catch (err) {
      console.error(err);
      alert("Erro ao adicionar item ao carrinho");
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Adicionar Item ao Carrinho</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>ID do Produto</label>
          <input
            type="number"
            value={idProduto}
            onChange={(e) => setIdProduto(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div>
          <label>Quantidade</label>
          <input
            type="number"
            value={quantidade}
            onChange={(e) => setQuantidade(Number(e.target.value))}
            className="w-full border px-3 py-2 rounded"
            required
            min={1}
          />
        </div>
        <div>
          <label>ID do Carrinho</label>
          <input
            type="number"
            value={idCarrinho}
            onChange={(e) => setIdCarrinho(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Adicionar Item
        </button>
      </form>
    </div>
  );
}
