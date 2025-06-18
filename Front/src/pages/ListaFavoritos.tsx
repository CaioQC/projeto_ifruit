// src/pages/ListaFavoritos.tsx
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";

interface Favorito {
  id: number;
  id_produto: number;
  id_cliente: number;
  data_adicao: string;
  // se retornar mais info do produto, pode colocar aqui também
}

export default function ListaFavoritos() {
  const { idCliente } = useParams<{ idCliente: string }>();
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchFavoritos = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Você precisa estar logado.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`/favoritos/${idCliente}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoritos(response.data);
      } catch {
        setError("Erro ao carregar favoritos.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, [idCliente]);

  if (loading) return <p>Carregando favoritos...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (favoritos.length === 0) return <p>Nenhum favorito encontrado.</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Meus Favoritos</h1>
      <ul className="space-y-3">
        {favoritos.map((fav) => (
          <li key={fav.id} className="border p-3 rounded shadow">
            <p><strong>ID Produto:</strong> {fav.id_produto}</p>
            <p><strong>Data de Adição:</strong> {fav.data_adicao}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
