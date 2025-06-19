/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axios";

interface Endereco {
  idEndereco: number;
  estado: string;
  bairro: string;
  cidade: string;
  rua: string;
  complemento: string;
  cep: string;
}

interface Cliente {
  id: number;
  nome: string;
  telefone: string;
  // enderecos removido daqui
}

interface Pedido {
  id_pedido: number;
  cliente: Cliente;
  status: {
    id_status: number;
    estado: string;
  };
  valor_total: number;
  data_pedido: string;
}

export default function PedidosEntregador() {
  const { idPedido } = useParams();
  const token = localStorage.getItem("token");

  const [pedido, setPedido] = useState<Pedido | null>(null);
  const [enderecos, setEnderecos] = useState<Endereco[]>([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    async function fetchPedido() {
      try {
        const res = await axios.get(`/pedido/${idPedido}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPedido(res.data);

        if (res.data.cliente?.id) {
          const resEnderecos = await axios.get(
            `/endereco/cliente/${res.data.cliente.id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setEnderecos(resEnderecos.data);
        }
      } catch (error) {
        setMensagem("Erro ao buscar pedido ou endereço.");
      }
    }
    fetchPedido();
  }, [idPedido, token]);

  async function atualizarStatus(novoStatus: number) {
    try {
      await axios.patch(
        `/pedido/${idPedido}`,
        { id_status: novoStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPedido((prev) =>
        prev
          ? { ...prev, status: { ...prev.status, id_status: novoStatus } }
          : prev
      );
      setMensagem("Status atualizado com sucesso!");
    } catch (error) {
      setMensagem("Erro ao atualizar status.");
    }
  }

  if (!pedido && !mensagem) return <p>Carregando...</p>;
  if (mensagem && !pedido) return <p className="mensagem">{mensagem}</p>;

  const enderecoParaMostrar = enderecos[0];

  return (
    <div className="entregador-form">
      <h2>Pedido #{pedido!.id_pedido}</h2>
      {mensagem && <p className="mensagem">{mensagem}</p>}
      <div className="pedido-info">
        <p>
          <strong>Cliente:</strong> {pedido!.cliente.nome}
        </p>

        {enderecoParaMostrar ? (
          <p>
            <strong>Endereço:</strong>{" "}
            {`${enderecoParaMostrar.rua}, ${enderecoParaMostrar.bairro} - ${enderecoParaMostrar.cidade} - ${enderecoParaMostrar.estado}, CEP: ${enderecoParaMostrar.cep}`}
          </p>
        ) : (
          <p>
            <strong>Endereço:</strong> Não encontrado
          </p>
        )}

        <p>
          <strong>Valor:</strong> R$ {pedido!.valor_total}
        </p>
        <p>
          <strong>Data:</strong> {pedido!.data_pedido}
        </p>
      </div>

      {/* <div className="status-select">
        <label>
          <strong>Status:</strong>
        </label>
        <select
          className="input"
          value={pedido!.status.id_status}
          onChange={(e) => atualizarStatus(Number(e.target.value))}
        >
          <option value={1}>Pendente</option>
          <option value={2}>Entregue</option>
        </select>
      </div> */}

      <button
        className="submit-button"
        onClick={() => atualizarStatus(2)}
        disabled={pedido!.status.id_status === 2}
        style={{ marginTop: "1.5rem" }}
      >
        Marcar como Entregue
      </button>
    </div>
  );
}
