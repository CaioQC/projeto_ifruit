import { Module } from '@nestjs/common';
import { ItensCarrinhoService } from './itens-carrinho.service';
import { ItensCarrinhoController } from './itens-carrinho.controller';

@Module({
  controllers: [ItensCarrinhoController],
  providers: [ItensCarrinhoService],
})
export class ItensCarrinhoModule {}
