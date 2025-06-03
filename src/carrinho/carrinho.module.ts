import { Module } from '@nestjs/common';
import { CarrinhoService } from './carrinho.service';
import { CarrinhoController } from './carrinho.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Carrinho } from './entities/carrinho.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrinho, Cliente])],
  controllers: [CarrinhoController],
  providers: [CarrinhoService],
  exports: [CarrinhoService]
})
export class CarrinhoModule {}
