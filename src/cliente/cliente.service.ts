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
    try {
      return this.clienteRepository.find();
    } catch (error) {
      console.error(error);
    }
  }

  findOne(id: number) {
    try {
      return this.clienteRepository.findOneBy({ id });
    } catch (error) {
      console.error(error);
    }
  }

  create(dto: CreateClienteDto) {
    try {
      const cliente = this.clienteRepository.create(dto);
      return this.clienteRepository.save(cliente);
    } catch (error) {
      console.error(error);
    }
  }

  async update(id: number, dto: UpdateClienteDto) {
    try {
      const cliente = await this.clienteRepository.findOneBy({ id });
      if (!cliente) return null;
      this.clienteRepository.merge(cliente, dto);
      return this.clienteRepository.save(cliente);
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id: number) {
    try {
      const cliente = await this.clienteRepository.findOneBy({ id });
      if (!cliente) return null;
      return this.clienteRepository.remove(cliente);
    } catch (error) {
      console.error(error);
    }
  }
}
