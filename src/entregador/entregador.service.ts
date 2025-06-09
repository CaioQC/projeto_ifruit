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
    try{
      return this.entregadorRepository.find()
    }

    catch(error){
      console.error(error);
    }
  }

  findOne(idEntregador: number) {
    try{
      return this.entregadorRepository.findOneBy({ idEntregador })
    }

    catch(error){
      console.error(error);
    }
  }

  create(dto: CreateEntregadorDto) {
    try{
      const entregador = this.entregadorRepository.create(dto)
      return this.entregadorRepository.save(entregador);
    }
    
    catch(error){
      console.error(error);
    }
  }

  async update(idEntregador: number, dto: UpdateEntregadorDto){
    try{
      const entregador = await this.entregadorRepository.findOneBy({ idEntregador })
      if(!entregador) return null
      this.entregadorRepository.merge(entregador, dto)
      return this.entregadorRepository.save(entregador)
    }

    catch(error){
      console.error(error);
    }
  }  

  async remove(idEntregador: number) {
    try{
      const entregador = await this.entregadorRepository.findOneBy({ idEntregador })
      if(!entregador) return null
      return this.entregadorRepository.remove(entregador)
    }

    catch(error){
      console.error(error);
    }
  }
}