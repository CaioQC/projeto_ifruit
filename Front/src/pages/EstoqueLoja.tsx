/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

interface Produto {
  idProduto: number;
  nome: string;
  descricao: string;
  preco: number;
  quantidade: number;
  categoria: string;
  loja?: { id: number };
}

export default function EstoqueLoja() {
  const { id } = useParams<{ id: string }>();
  const token = localStorage.getItem("token");

  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [mensagem, setMensagem] = useState("");

  // Form para novo produto
  const [novoProduto, setNovoProduto] = useState({
    nome: "",
    descricao: "",
    preco: "",
    quantidade: "",
    categoria: "",
  });

  useEffect(() => {
    async function fetchProdutos() {
      try {
        const response = await axios.get(`/produto/loja/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProdutos(response.data);
      } catch (error) {
        setMensagem("Erro ao carregar produtos.");
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, [id, token]);

  // Atualiza campos do novo produto
  function handleNovoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setNovoProduto((prev) => ({ ...prev, [name]: value }));
  }

  // Adicionar novo produto
  async function handleAdicionar() {
    if (!id) return setMensagem("Loja inválida.");

    try {
      const body = {
        ...novoProduto,
        preco: Number(novoProduto.preco),
        quantidade: Number(novoProduto.quantidade),
        id_loja: Number(id),
      };
      const response = await axios.post("/produto", body, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos((prev) => [...prev, response.data]);
      setNovoProduto({
        nome: "",
        descricao: "",
        preco: "",
        quantidade: "",
        categoria: "",
      });
      setMensagem("Produto adicionado com sucesso!");
    } catch {
      setMensagem("Erro ao adicionar produto.");
    }
  }

  //excluir um produto
  async function handleExcluir(idProduto: number) {
    try {
      await axios.delete(`/produto/${idProduto}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProdutos((prev) => prev.filter((p) => p.idProduto !== idProduto));
      setMensagem("Produto excluído com sucesso!");
    } catch {
      setMensagem("Erro ao excluir produto.");
    }
  }

  // Editar produto já listado
  async function handleEditar(index: number) {
    const produto = produtos[index];
    try {
      await axios.patch(`/produto/${produto.idProduto}`, produto, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMensagem("Produto atualizado!");
    } catch {
      setMensagem("Erro ao atualizar produto.");
    }
  }

  // Atualizar dados do produto na lista (edição inline)
  function handleProdutoChange(
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const name = e.target.name as keyof Produto;
    const value = e.target.value;
    const updated = [...produtos];

    if (name === "preco" || name === "quantidade") {
      updated[index] = {
        ...updated[index],
        [name]: Number(value),
      };
    } else {
      updated[index] = {
        ...updated[index],
        [name]: value,
      };
    }

    setProdutos(updated);
  }

  if (loading) return <p>Carregando produtos...</p>;

  return (
    <div className="estoque-form">
      <h2>Estoque da Loja</h2>
      {mensagem && <p className="mensagem">{mensagem}</p>}

      <section className="novo-produto">
        <h3>Adicionar novo produto</h3>
        <input
          className="input"
          type="text"
          name="nome"
          placeholder="Nome"
          value={novoProduto.nome}
          onChange={handleNovoChange}
        />
        <input
          className="input"
          type="text"
          name="descricao"
          placeholder="Descrição"
          value={novoProduto.descricao}
          onChange={handleNovoChange}
        />
        <input
          className="input"
          type="number"
          name="preco"
          placeholder="Preço"
          value={novoProduto.preco}
          onChange={handleNovoChange}
        />
        <input
          className="input"
          type="number"
          name="quantidade"
          placeholder="Quantidade"
          value={novoProduto.quantidade}
          onChange={handleNovoChange}
        />
        <input
          className="input"
          type="text"
          name="categoria"
          placeholder="Categoria"
          value={novoProduto.categoria}
          onChange={handleNovoChange}
        />
        <button className="add-button" onClick={handleAdicionar}>
          Adicionar Produto
        </button>
      </section>

      <section className="produto-lista">
        <h3>Produtos cadastrados</h3>
        {produtos.length === 0 && <p>Nenhum produto encontrado.</p>}
        {produtos.map((p, i) => (
          <div key={p.idProduto} className="produto-item">
            <input
              className="input"
              type="text"
              name="nome"
              value={p.nome}
              onChange={(e) => handleProdutoChange(i, e)}
              placeholder="Nome"
            />
            <input
              className="input"
              type="text"
              name="descricao"
              value={p.descricao}
              onChange={(e) => handleProdutoChange(i, e)}
              placeholder="Descrição"
            />
            <input
              className="input"
              type="number"
              name="preco"
              value={p.preco}
              onChange={(e) => handleProdutoChange(i, e)}
              placeholder="Preço"
            />
            <input
              className="input"
              type="number"
              name="quantidade"
              value={p.quantidade}
              onChange={(e) => handleProdutoChange(i, e)}
              placeholder="Quantidade"
            />
            <input
              className="input"
              type="text"
              name="categoria"
              value={p.categoria}
              onChange={(e) => handleProdutoChange(i, e)}
              placeholder="Categoria"
            />
            <button className="save-button" onClick={() => handleEditar(i)}>
              Salvar Alterações
            </button>
            <button
              className="delete-button"
              type="button"
              onClick={() => handleExcluir(p.idProduto)}
            >
              Excluir
            </button>
          </div>
        ))}
      </section>
    </div>
  );
}
