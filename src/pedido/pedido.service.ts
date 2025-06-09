import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { Repository } from 'typeorm';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Entregador } from 'src/entregador/entities/entregador.entity';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { Status } from 'src/status/entities/status.entity';

@Injectable()
export class PedidoService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
    @InjectRepository(Carrinho)
    private readonly carrinhoRepository: Repository<Carrinho>,
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
    @InjectRepository(Entregador)
    private readonly entregadorRepository: Repository<Entregador>,
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>
  ) {}

  findAll(){
    try{
      return this.pedidoRepository.find()
    }

    catch(error){
      console.error(error);
    }
  }

  findOne(id_pedido: number){
    try{
      return this.pedidoRepository.findOneBy({ id_pedido })
    }

    catch(error){
      console.error(error);
    }
  }

  async create(dto: CreatePedidoDto){
    try{
      const cliente = await this.clienteRepository.findOneBy({ idCliente: dto.id_cliente })
      if(!cliente) return null
  
      const carrinho = await this.carrinhoRepository.findOneBy({ idCarrinho: dto.id_carrinho })
      if(!carrinho) return null
  
      const entregador = await this.entregadorRepository.findOneBy({ idEntregador: dto.id_entregador })
      if(!entregador) return null
  
      const status = await this.statusRepository.findOneBy({ id_status: dto.id_status })
      if(!status) return null
  
      const pedido = this.pedidoRepository.create({
        ...dto,
        cliente,
        carrinho,
        entregador,
        status
      })
  
      return this.pedidoRepository.save(pedido);
    }

    catch(error){
      console.error(error);
    }
  }

  async update(id_pedido: number, dto: UpdatePedidoDto){
    try{
      const pedido = await this.pedidoRepository.findOneBy({ id_pedido })
      if(!pedido) return null
      this.pedidoRepository.merge(pedido, dto)
  
      return this.pedidoRepository.save(pedido)
    }

    catch(error){
      console.error(error);
    }
  }  

  async remove(id_pedido: number) {
    try{
      const pedido = await this.pedidoRepository.findOneBy({ id_pedido })
      if(!pedido) return null
  
      return this.pedidoRepository.remove(pedido)
    }

    catch(error){
      console.error(error);
    }
  }
}