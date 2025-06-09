import { Injectable } from '@nestjs/common';
import { CreateEnderecoDto } from './dto/create-endereco.dto';
import { UpdateEnderecoDto } from './dto/update-endereco.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Endereco } from './entities/endereco.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class EnderecoService {
  constructor(
    @InjectRepository(Endereco)
    private readonly enderecoRepository: Repository<Endereco>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>
  ){}

  async create(dto: CreateEnderecoDto) {
    try{
      const cliente = await this.clienteRepository.findOneBy({ idCliente: dto.id_cliente })
      if(!cliente) return null
  
      const endereco = this.enderecoRepository.create({
        ...dto,
        cliente
      })
  
      return this.enderecoRepository.save(endereco);
    }

    catch(error){
      console.error(error);
    }
  }

  findAll() {
    try{
      return this.enderecoRepository.find();
    }
    
    catch(error){
      console.error(error);
    }
  }

  findOne(idEndereco: number) {
    try{
      return this.enderecoRepository.findOneBy({ idEndereco });
    }

    catch(error){
      console.error(error);
    }
  }

  async update(idEndereco: number, dto: UpdateEnderecoDto) {
    try{
      const endereco = await this.enderecoRepository.findOneBy({ idEndereco })
      if(!endereco) return null
      this.enderecoRepository.merge(endereco, dto)
  
      return this.enderecoRepository.save(endereco);
    }

    catch(error){
      console.error(error);
    }
  }

  async remove(idEndereco: number) {
    try{
      const endereco = await this.enderecoRepository.findOneBy({ idEndereco })
      if(!endereco) return null
  
      return this.enderecoRepository.remove(endereco);
    }

    catch(error){
      console.error(error);
    }
  }
}
