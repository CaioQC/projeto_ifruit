import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateClienteDto } from './dto/update-cliente.dto';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/create-cliente.dto';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  findAll() {
    try{
      return this.clienteRepository.find()
    }

    catch(error){
      console.error(error)
    }
  }

  findOne(idCliente: number) {
    try{
      return this.clienteRepository.findOneBy({ idCliente })
    }

    catch(error){
      console.error(error);
    }
  }

  create(dto: CreateClienteDto) {
    try{
      const cliente = this.clienteRepository.create(dto)
      return this.clienteRepository.save(cliente);
    }

    catch(error){
      console.error(error);
    }
  }

  async update(idCliente: number, dto: UpdateClienteDto) {
    try{
      const cliente = await this.clienteRepository.findOneBy({ idCliente })
      if(!cliente) return null
      this.clienteRepository.merge(cliente ,dto)
      return this.clienteRepository.save(cliente);
    }

    catch(error){
      console.error(error);
    }
  }  

  async remove(idCliente: number) {
    try{
      const cliente = await this.clienteRepository.findOneBy({ idCliente })
      if(!cliente) return null
      return this.clienteRepository.remove(cliente);
    }

    catch(error){
      console.error(error);
    }
  }
}
