import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BuscarPedidosEntregador() {
  const [idPedido, setIdPedido] = useState("");
  const navigate = useNavigate();

  function handleBuscar() {
    if (idPedido.trim()) {
      navigate(`/entregador/pedido/${idPedido}`);
    }
  }

  return (
    <div className="entregador-form">
      <h2>Buscar Pedido</h2>
      <input
        className="input"
        type="text"
        placeholder="Digite o ID do pedido"
        value={idPedido}
        onChange={(e) => setIdPedido(e.target.value)}
      />
      <button className="submit-button" onClick={handleBuscar}>
        Buscar
      </button>
    </div>
  );
}
