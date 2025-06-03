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
    return this.clienteRepository.find()
  }

  findOne(idCliente: number) {
    return this.clienteRepository.findOneBy({ idCliente })
  }

  create(dto: CreateClienteDto) {
    const cliente = this.clienteRepository.create(dto)
    return this.clienteRepository.save(cliente);
  }

  async update(idCliente: number, dto: UpdateClienteDto) {
    const cliente = await this.clienteRepository.findOneBy({ idCliente })
    if(!cliente) return null
    this.clienteRepository.merge(cliente ,dto)
    return this.clienteRepository.save(cliente);
  }  

  async remove(idCliente: number) {
    const cliente = await this.clienteRepository.findOneBy({ idCliente })
    if(!cliente) return null
    return this.clienteRepository.remove(cliente);
  }
}
