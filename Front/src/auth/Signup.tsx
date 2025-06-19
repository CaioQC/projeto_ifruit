/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    role: "",
    endereco: "",
    dados_bancarios: "",
    cpf: "",
    veiculo: ""
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: any = {
      nome: form.nome,
      email: form.email,
      telefone: form.telefone,
      senha: form.senha,
      role: form.role,
    };

    if (form.role === "MANAGER") {
      payload.endereco = form.endereco;
      payload.dados_bancarios = form.dados_bancarios;
    } else if (form.role === "DELIVERY") {
      payload.cpf = form.cpf;
      payload.veiculo = form.veiculo;
      payload.dados_bancarios = form.dados_bancarios;
    }

    try {
      await axios.post("/auth/signup", payload);
      alert("Conta criada com sucesso!");
      navigate("/signin");
    } catch (err: any) {
      console.error("Erro no cadastro:", err.response?.data || err.message || err);
      alert(
        "Erro ao criar conta: " +
        (err.response?.data?.message || err.message || "Erro desconhecido")
      );
    }
  };

  return (
    <div className="signup-form">
      <h1>Criar Conta</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input"
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
        />
        <input
          className="input"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          className="input"
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
        />
        <input
          className="input"
          name="senha"
          type="password"
          placeholder="Senha"
          value={form.senha}
          onChange={handleChange}
        />
        <select
          className="input"
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="" disabled hidden selected>Selecione o tipo de conta</option>
          <option value="USER">Cliente</option>
          <option value="DELIVERY">Entregador</option>
          <option value="MANAGER">Lojista</option>
        </select>

        {form.role === "MANAGER" && (
          <>
            <input
              className="input"
              name="endereco"
              placeholder="Endereço da loja"
              value={form.endereco}
              onChange={handleChange}
            />
            <input
              className="input"
              name="dados_bancarios"
              placeholder="Dados Bancários"
              value={form.dados_bancarios}
              onChange={handleChange}
            />
          </>
        )}

        {form.role === "DELIVERY" && (
          <>
            <input
              className="input"
              name="cpf"
              placeholder="CPF"
              value={form.cpf}
              onChange={handleChange}
            />
            <input
              className="input"
              name="veiculo"
              placeholder="Tipo de veículo"
              value={form.veiculo}
              onChange={handleChange}
            />
            <input
              className="input"
              name="dados_bancarios"
              placeholder="Dados Bancários"
              value={form.dados_bancarios}
              onChange={handleChange}
            />
          </>
        )}

        <button type="submit" className="submit-button">
          Cadastrar
        </button>
      </form>

      <button
        type="button"
        className="login-button"
        onClick={() => navigate("/signin")}
        style={{
          marginTop: "1rem",
          backgroundColor: "transparent",
          border: "none",
          color: "#646cff",
          cursor: "pointer",
          fontWeight: "600",
          textDecoration: "underline",
        }}
      >
        Já tenho login
      </button>
    </div>
  );
}