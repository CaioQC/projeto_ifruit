import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", senha: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post("/auth/signin", form);
      const token = res.data.access_token;
      const id = res.data.id;
      const role = res.data.role; // pega o role retornado

      localStorage.setItem("id_cliente", id);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("Login realizado!");

      // Navegar baseado na role
      if (role === "MANAGER") {
        navigate("/visualizar-loja"); // rota para dados da loja
      } else if (role === "USER") {
        navigate("/adicionar-endereco"); // rota para adicionar endereço
      } else if (role === "DELIVER") {
        navigate("/dashboard-entregador"); // rota para entregador, por exemplo
      } else {
        navigate("/"); // fallback para rota padrão
      }
    } catch (err) {
      alert("Erro ao logar.");
      console.error(err);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}
