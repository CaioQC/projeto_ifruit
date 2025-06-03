import { Module } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { PedidoController } from './pedido.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Status } from 'src/status/entities/status.entity';
import { Entregador } from 'src/entregador/entities/entregador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pedido, Cliente, Carrinho, Status, Entregador])],
  controllers: [PedidoController],
  providers: [PedidoService],
  exports: [PedidoService]
})
export class PedidoModule {}
