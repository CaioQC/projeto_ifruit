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
      const role = res.data.role;

      localStorage.setItem("id_cliente", id);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("Login realizado!");
      console.log("Login success:", { id, token, role });

      if (role === "MANAGER") {
        navigate("/informacao-loja");
      } else if (role === "USER") {
        navigate("/criar-pedido");
      } else if (role === "DELIVERY") {
        navigate("/dashboard-entregador");
      } else {
        navigate("/");
      }
    } catch (err) {
      alert("Erro ao logar.");
      console.error(err);
    }
  };

  return (
    <div className="login-form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="input"
        />
        <input
          name="senha"
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
          className="input"
        />
        <button type="submit" className="submit-button">
          Entrar
        </button>
      </form>

      {/* Botão para ir para cadastro */}
      <button
        type="button"
        className="signup-link"
        onClick={() => navigate("/")}
      >
        Ainda não tem conta? Cadastre-se
      </button>
    </div>
  );
}
