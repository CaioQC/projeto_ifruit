import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClienteModule } from './cliente/cliente.module';
import { EnderecoModule } from './endereco/endereco.module';
import { CarrinhoModule } from './carrinho/carrinho.module';
import { ItensCarrinhoModule } from './itens-carrinho/itens-carrinho.module';
import { ProdutoModule } from './produto/produto.module';
import { LojaModule } from './loja/loja.module';
import { AvaliacaoModule } from './avaliacao/avaliacao.module';
import { FavoritosModule } from './favoritos/favoritos.module';
import { EntregadorModule } from './entregador/entregador.module';
import { PedidoModule } from './pedido/pedido.module';
import { PagamentoModule } from './pagamento/pagamento.module';
import { HistoricoCompraModule } from './historico-compra/historico-compra.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [ClienteModule, EnderecoModule, CarrinhoModule, ItensCarrinhoModule, ProdutoModule, LojaModule, AvaliacaoModule, FavoritosModule, EntregadorModule, PedidoModule, PagamentoModule, HistoricoCompraModule, StatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
