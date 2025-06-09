import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Carrinho } from './entities/carrinho.entity';
import { Repository } from 'typeorm';
import { UpdateCarrinhoDto } from './dto/update-carrinho.dto';
import { CreateCarrinhoDto } from './dto/create-carrinho.dto';
import { Cliente } from 'src/cliente/entities/cliente.entity';

@Injectable()
export class CarrinhoService {
  constructor(
    @InjectRepository(Carrinho)
    private carrinhoRepository: Repository<Carrinho>,
    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>
  ) {}

  findAll(){
    try{
      return this.carrinhoRepository.find({
        relations : ["cliente"]
      });
    }

    catch(error){
      console.error(error);
    }
  }

  findOne(idCarrinho: number){
    try{
      return this.carrinhoRepository.findOne({ 
        where : { idCarrinho : idCarrinho },
        relations : ["cliente"]
      });
    }

    catch(error){
      console.error(error);
    }
  }

  async create(dto: CreateCarrinhoDto){
    try{
      const cliente = await this.clienteRepository.findOneBy({ idCliente: dto.idCliente })
      if(!cliente) return null
      
      const carrinho = this.carrinhoRepository.create({
        ...dto,
        cliente
      })
      return this.carrinhoRepository.save(carrinho);
    }

    catch(error){
      console.error(error);
    }
  }

  async update(idCarrinho: number, dto: UpdateCarrinhoDto){
    try{
      const carrinho = await this.carrinhoRepository.findOneBy({ idCarrinho })
      if(!carrinho) return null
      this.carrinhoRepository.merge(carrinho, dto)
      return this.carrinhoRepository.save(carrinho)
    }

    catch(error){
      console.error(error);
    }
  }  

  async remove(idCarrinho: number) {
    try{
      const carrinho = await this.carrinhoRepository.findOneBy({ idCarrinho })
      if(!carrinho) return null
      return this.carrinhoRepository.remove(carrinho)
    }
    
    catch(error){
      console.error(error);
    }
  }
}