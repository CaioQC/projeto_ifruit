import { Injectable } from '@nestjs/common';
import { CreateHistoricoCompraDto } from './dto/create-historico-compra.dto';
import { UpdateHistoricoCompraDto } from './dto/update-historico-compra.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HistoricoCompra } from './entities/historico-compra.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';

@Injectable()
export class HistoricoCompraService {
  constructor(
    @InjectRepository(HistoricoCompra)
    private readonly historicoCompraRepository: Repository<HistoricoCompra>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>
  ){}

  async create(dto: CreateHistoricoCompraDto) {
    const cliente = await this.clienteRepository.findOneBy({ idCliente: dto.id_cliente })
    if(!cliente) return null

    const pedido = await this.pedidoRepository.findOneBy({ id_pedido: dto.id_pedido })
    if(!pedido) return null

    const historicoCompra = this.historicoCompraRepository.create({
      ...dto,
      cliente,
      pedido
    })

    return this.historicoCompraRepository.save(historicoCompra);
  }

  findAll() {
    return this.historicoCompraRepository.find();
  }

  findOne(id_historico_compra: number) {
    return this.historicoCompraRepository.findOneBy({ id_historico_compra });
  }

  async update(id_historico_compra: number, dto: UpdateHistoricoCompraDto) {
    const historicoCompra = await this.historicoCompraRepository.findOneBy({ id_historico_compra })
    if(!historicoCompra) return null
    this.historicoCompraRepository.merge(historicoCompra, dto)

    return this.historicoCompraRepository.save(historicoCompra);
  }

  async remove(id_historico_compra: number) {
    const historicoCompra = await this.historicoCompraRepository.findOneBy({ id_historico_compra })
    if(!historicoCompra) return null

    return this.historicoCompraRepository.remove(historicoCompra);
  }
}
