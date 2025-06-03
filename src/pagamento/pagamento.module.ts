import { Module } from '@nestjs/common';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from './pagamento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pagamento } from './entities/pagamento.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Status } from 'src/status/entities/status.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Pagamento, Pedido, Status])],
  controllers: [PagamentoController],
  providers: [PagamentoService],
  exports: [PagamentoService]
})
export class PagamentoModule {}
