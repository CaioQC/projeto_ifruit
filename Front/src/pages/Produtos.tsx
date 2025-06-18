// src/pages/Produtos.tsx
import { useEffect, useState } from "react";
import axios from "../api/axios";

type Produto = {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  categoria: string;
  quantidade: number;
};

export default function Produtos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await axios.get("/produto");
        setProdutos(response.data);
      } catch (error) {
        console.error("Erro ao buscar produtos", error);
      }
    };

    fetchProdutos();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produtos Disponíveis</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div key={produto.id} className="border p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold">{produto.nome}</h2>
            <p className="text-gray-600">{produto.descricao}</p>
            <p className="text-sm text-gray-500">{produto.categoria}</p>
            <p className="text-lg font-bold mt-2">R$ {produto.preco.toFixed(2)}</p>
            <p className="text-sm mt-1">Qtd: {produto.quantidade}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
