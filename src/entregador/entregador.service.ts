import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Entregador } from './entities/entregador.entity';
import { Repository } from 'typeorm';
import { UpdateEntregadorDto } from './dto/update-entregador.dto';
import { CreateEntregadorDto } from './dto/create-entregador.dto';

@Injectable()
export class EntregadorService {
  constructor(
    @InjectRepository(Entregador)
    private entregadorRepository: Repository<Entregador>,
  ) {}

  findAll() {
    return this.entregadorRepository.find()
  }

  findOne(idEntregador: number) {
    return this.entregadorRepository.findOneBy({ idEntregador })
  }

  create(dto: CreateEntregadorDto) {
    const entregador = this.entregadorRepository.create(dto)
    return this.entregadorRepository.save(entregador);
  }

  async update(idEntregador: number, dto: UpdateEntregadorDto){
    const entregador = await this.entregadorRepository.findOneBy({ idEntregador })
    if(!entregador) return null
    this.entregadorRepository.merge(entregador, dto)
    return this.entregadorRepository.save(entregador)
  }  

  async remove(idEntregador: number) {
    const entregador = await this.entregadorRepository.findOneBy({ idEntregador })
    if(!entregador) return null
    return this.entregadorRepository.remove(entregador)
  }
}