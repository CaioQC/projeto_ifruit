import { Module } from '@nestjs/common';
import { LojaService } from './loja.service';
import { LojaController } from './loja.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loja } from './entities/loja.entity';
import { ClienteService } from 'src/cliente/cliente.service';

@Module({
  imports: [TypeOrmModule.forFeature([Loja])],
  controllers: [LojaController],
  providers: [LojaService],
  exports: [LojaService]
})
export class LojaModule { }
