import { Module } from '@nestjs/common';
import { EntregadorService } from './entregador.service';
import { EntregadorController } from './entregador.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entregador } from './entities/entregador.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Entregador])],
  controllers: [EntregadorController],
  providers: [EntregadorService],
  exports: [EntregadorService]
})
export class EntregadorModule {}
