import { Module } from '@nestjs/common';
import { ItensCarrinhoService } from './itens-carrinho.service';
import { ItensCarrinhoController } from './itens-carrinho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItensCarrinho } from './entities/itens-carrinho.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Produto } from 'src/produto/entities/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ItensCarrinho, Carrinho, Produto])],
  controllers: [ItensCarrinhoController],
  providers: [ItensCarrinhoService],
  exports: [ItensCarrinhoService]
})
export class ItensCarrinhoModule {}
