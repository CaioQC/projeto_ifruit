// src/pages/Endereco.tsx
import { useState } from "react";
import axios from "../api/axios";

const id_cliente = localStorage.getItem("id_cliente");

export default function Endereco() {
  const [form, setForm] = useState({
    estado: "",
    cidade: "",
    bairro: "",
    rua: "",
    complemento: "",
    cep: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/endereco", {
        ...form,
        id_cliente: Number(id_cliente), // ← aqui você pode depois puxar dinamicamente
      });
      alert("Endereço adicionado com sucesso!");
    } catch (err) {
      alert("Erro ao adicionar endereço.");
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Adicionar Endereço</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input name="estado" placeholder="Estado" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="cidade" placeholder="Cidade" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="bairro" placeholder="Bairro" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="rua" placeholder="Rua" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="complemento" placeholder="Complemento" onChange={handleChange} className="w-full p-2 border rounded" />
        <input name="cep" placeholder="CEP" onChange={handleChange} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-purple-600 text-white py-2 rounded">Salvar Endereço</button>
      </form>
    </div>
  );
}
