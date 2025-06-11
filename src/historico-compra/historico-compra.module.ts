import { Module } from '@nestjs/common';
import { HistoricoCompraService } from './historico-compra.service';
import { HistoricoCompraController } from './historico-compra.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoricoCompra } from './entities/historico-compra.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HistoricoCompra, Cliente, Pedido])],
  controllers: [HistoricoCompraController],
  providers: [HistoricoCompraService],
  exports: [HistoricoCompraService],
})
export class HistoricoCompraModule {}
