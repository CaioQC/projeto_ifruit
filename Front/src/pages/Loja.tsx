/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

interface Loja {
  id?: number;
  nome: string;
  endereco: string;
  email: string;
  telefone: string;
  senha: string;
  dados_bancarios: string;
  role: string;
}

export default function LojaPerfil() {
  const [loja, setLoja] = useState<Loja>({
    nome: "",
    endereco: "",
    email: "",
    telefone: "",
    senha: "",
    dados_bancarios: "",
    role: "MANAGER",
  });

  const [loading, setLoading] = useState(true);
  const [editando, setEditando] = useState(false);
  const [mensagem, setMensagem] = useState("");

  const idCliente = localStorage.getItem("id_cliente");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLoja = async () => {
      try {
        const response = await axios.get(`/loja/${idCliente}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLoja(response.data);
      } catch (error) {
        setMensagem("Erro ao carregar dados da loja.");
      } finally {
        setLoading(false);
      }
    };

    if (idCliente && token) fetchLoja();
  }, [idCliente, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoja((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`/loja/${idCliente}`, loja, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMensagem("Dados atualizados com sucesso.");
      setEditando(false);
    } catch (error) {
      setMensagem("Erro ao atualizar os dados.");
    }
  };

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="loja-perfil-form">
      <h1>Dados da Loja</h1>

      {mensagem && <p>{mensagem}</p>}

      <form onSubmit={handleSubmit}>
        <input
          className="input"
          type="text"
          name="nome"
          value={loja.nome}
          onChange={handleChange}
          disabled={!editando}
          placeholder="Nome"
        />
        <input
          className="input"
          type="text"
          name="endereco"
          value={loja.endereco}
          onChange={handleChange}
          disabled={!editando}
          placeholder="Endereço"
        />
        <input
          className="input"
          type="email"
          name="email"
          value={loja.email}
          onChange={handleChange}
          disabled={!editando}
          placeholder="Email"
        />
        <input
          className="input"
          type="text"
          name="telefone"
          value={loja.telefone}
          onChange={handleChange}
          disabled={!editando}
          placeholder="Telefone"
        />
        <input
          className="input"
          type="password"
          name="senha"
          value={loja.senha}
          onChange={handleChange}
          disabled={!editando}
          placeholder="Senha"
        />
        <input
          className="input"
          type="text"
          name="dados_bancarios"
          value={loja.dados_bancarios}
          onChange={handleChange}
          disabled={!editando}
          placeholder="Dados Bancários"
        />

        {editando ? (
          <>
            <button className="submit-button" type="submit">
              Salvar
            </button>
            <button
              className="cancel-button"
              type="button"
              onClick={() => setEditando(false)}
            >
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button
              className="edit-button"
              type="button"
              onClick={() => setEditando(true)}
            >
              Editar
            </button>

            {/* Botão para ver estoque */}
            <button
              className="submit-button"
              type="button"
              onClick={() => {
                if (loja.id) {
                  navigate(`/estoque/${loja.id}`);
                } else {
                  setMensagem("ID da loja não encontrado.");
                }
              }}
            >
              Ver Estoque
            </button>
          </>
        )}
      </form>
    </div>
  );
}
