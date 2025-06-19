// src/App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Produtos from "./pages/Produtos";
import { AuthProvider } from "./context/AuthContext";
import Carrinho from "./pages/Carrinho";
import CriarPedido from "./pages/CriarPedido";
import AdicionarPagamento from "./pages/AdicionarPagamento";
import VisualizarPedido from "./pages/VisualizarPedido";
import AdicionarFavorito from "./pages/AdicionarFavorito";
import ListaFavoritos from "./pages/ListaFavoritos";
import Signup from "./auth/Signup";
import Endereco from "./pages/Endereco";
import Favoritos from "./pages/Favoritos";
import Historico from "./pages/Historico";
import LojaPerfil from "./pages/Loja";
import EstoqueLoja from "./pages/EstoqueLoja";
import BuscarPedidosEntregador from "./pages/BuscarPedidosEntregador";
import PedidosEntregador from "./pages/PedidosEntregador";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          ----------- Fluxo cliente ---------------
          <Route path="/" element={<Signup />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/adicionar-endereco" element={<Endereco />} />
          <Route path="/criar-pedido" element={<CriarPedido />} />
          <Route path="/pagamento/:idPedido" element={<AdicionarPagamento />} />
          <Route path="/pedido/:id" element={<VisualizarPedido />} />
          <Route path="/historico/:id" element={<Historico />} />
          <Route path="/favoritos/cliente/:id" element={<Favoritos />} />

        ----------- Fluxo Loja ---------------
        <Route path="/informacao-loja" element={<LojaPerfil />} />
        <Route path="/estoque/:id" element={<EstoqueLoja />} />

        ----------- Fluxo Entregador ---------------
        <Route path="/buscar-pedido" element={<BuscarPedidosEntregador />} />
        <Route path="/entregador/pedido/:idPedido" element={<PedidosEntregador />} />

          <Route path="/produtos" element={<Produtos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/criar-pedido" element={<CriarPedido />} />
          <Route path="/adicionar-pagamento" element={<AdicionarPagamento />} />
          <Route path="/pedido/:id" element={<VisualizarPedido />} />
          <Route path="/favoritos/adicionar" element={<AdicionarFavorito />} />
          <Route path="/favoritos/:idCliente" element={<ListaFavoritos />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
