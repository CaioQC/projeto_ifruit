/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

interface Favorito {
  id_favorito: number;
  produto: {
    idProduto: number;
    nome: string;
    descricao: string;
    preco: number;
    quantidade: number;
    categoria: string;
    loja: any | null;
  };
  cliente: {
    id: number;
    email: string;
    senha: string;
    role: string;
    nome: string;
    telefone: string;
  };
  data_adicao: string;
}

export default function Favoritos() {
  const { id } = useParams<{ id: string }>();
  const [favoritos, setFavoritos] = useState<Favorito[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!token) {
        setError("Você precisa estar logado.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get(`/favoritos/cliente/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFavoritos(response.data);
      } catch (err) {
        setError("Erro ao buscar favoritos.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavoritos();
  }, [id, token]);

  if (loading) return <p>Carregando favoritos...</p>;
  if (error) return <p className="error-text">{error}</p>;
  if (favoritos.length === 0) return <p>Você não tem produtos favoritados.</p>;

  return (
  <div className="favoritos-container">
    <h1>Meus Favoritos</h1>
    <ul className="favoritos-list">
      {favoritos.map((favorito) => (
        <li key={favorito.id_favorito} className="favorito-item">
          <div className="favorito-info">
            <p className="nome-produto">{favorito.produto.nome}</p>
            <p className="preco-produto">Preço: R$ {favorito.produto.preco.toFixed(2)}</p>
            <p className="data-favorito">
              Favoritado em: {new Date(favorito.data_adicao).toLocaleDateString()}
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);
}
