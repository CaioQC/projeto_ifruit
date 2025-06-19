/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/Endereco.tsx
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate, useParams } from "react-router-dom";

export default function Endereco() {
  const [form, setForm] = useState({
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    complemento: "",
    cep: "",
  });

  const navigate = useNavigate();
  const { idPedido } = useParams();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const idCliente = localStorage.getItem("id_cliente");

    if (!idCliente || !token) {
      alert("Usuário não autenticado. Faça login novamente.");
      return;
    }

    try {
      await axios.post("/endereco", {
        ...form,
        id_cliente: Number(idCliente),
      });
      alert("Endereço adicionado com sucesso!");
      navigate(`/pagamento/${idPedido}`);
    } catch (err: any) {
      console.error("Erro ao adicionar endereço:", err);
      alert(
        "Erro ao adicionar endereço: " +
          (err.response?.data?.message || err.message)
      );
    }
  };

  return (
    <div className="container-endereco">
      <h1 className="titulo-endereco">Adicionar Endereço</h1>

      <form onSubmit={handleSubmit} className="form-endereco">
        <input
          name="estado"
          placeholder="Estado"
          onChange={handleChange}
          className="input-endereco"
        />
        <input
          name="cidade"
          placeholder="Cidade"
          onChange={handleChange}
          className="input-endereco"
        />
        <input
          name="bairro"
          placeholder="Bairro"
          onChange={handleChange}
          className="input-endereco"
        />
        <input
          name="rua"
          placeholder="Rua"
          onChange={handleChange}
          className="input-endereco"
        />
        <input
          name="complemento"
          placeholder="Complemento"
          onChange={handleChange}
          className="input-endereco"
        />
        <input
          name="cep"
          placeholder="CEP"
          onChange={handleChange}
          className="input-endereco"
        />
        <button type="submit" className="btn-salvar-endereco">
          Salvar Endereço
        </button>
      </form>
    </div>
  );
}
