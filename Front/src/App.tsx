// src/App.tsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./auth/Login";
import Produtos from "./pages/Produtos";
import { AuthProvider } from "./context/AuthContext";
import Carrinho from "./pages/Carrinho";
import AdicionarItem from "./pages/AdicionarItem";
import CriarPedido from "./pages/CriarPedido";
import AdicionarPagamento from "./pages/AdicionarPagamento";
import VisualizarPedido from "./pages/VisualizarPedido";
import CriarHistoricoCompra from "./pages/CriarHistoricoCompra";
import AdicionarFavorito from "./pages/AdicionarFavorito";
import ListaFavoritos from "./pages/ListaFavoritos";
import Signup from "./auth/Signup";
import Endereco from "./pages/Endereco";
import HistoricoPedidos from "./pages/Historico";
import Favoritos from "./pages/Favoritos";

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
          <Route path="/historico/:id" element={<HistoricoPedidos />} />
          <Route path="/favoritos/cliente/:id" element={<Favoritos />} />




          <Route path="/produtos" element={<Produtos />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/adicionar-item" element={<AdicionarItem />} />
          <Route path="/criar-pedido" element={<CriarPedido />} />
          <Route path="/adicionar-pagamento" element={<AdicionarPagamento />} />
          <Route path="/pedido/:id" element={<VisualizarPedido />} />
          <Route path="/historico-compra" element={<CriarHistoricoCompra />} />
          <Route path="/favoritos/adicionar" element={<AdicionarFavorito />} />
          <Route path="/favoritos/:idCliente" element={<ListaFavoritos />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
