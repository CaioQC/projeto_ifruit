import { Module } from '@nestjs/common';
import { HistoricoCompraService } from './historico-compra.service';
import { HistoricoCompraController } from './historico-compra.controller';

@Module({
  controllers: [HistoricoCompraController],
  providers: [HistoricoCompraService],
})
export class HistoricoCompraModule {}
