import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from 'src/status/entities/status.entity';
import { Repository } from 'typeorm';
import { CreatePagamentoDto } from './dto/create-pagamento.dto';
import { UpdatePagamentoDto } from './dto/update-pagamento.dto';
import { Pagamento } from './entities/pagamento.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';

@Injectable()
export class PagamentoService {
  constructor(
    @InjectRepository(Pagamento)
    private readonly pagamentoRepository: Repository<Pagamento>,

    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,

    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>
  ){}

  async create(dto: CreatePagamentoDto) {
    const status = await this.statusRepository.findOneBy({ id_status: dto.id_status })
    if(!status) return null

    const pedido = await this.pedidoRepository.findOneBy({ id_pedido: dto.id_pedido })
    if(!pedido) return null

    const pagamento = this.pagamentoRepository.create({
      ...dto,
      pedido,
      status
    })

    return this.pagamentoRepository.save(pagamento);
  }

  findAll() {
    return this.pagamentoRepository.find();
  }

  findOne(id_pagamento: number) {
    return this.pagamentoRepository.findOneBy({ id_pagamento });
  }

  async update(id_pagamento: number, dto: UpdatePagamentoDto) {
    const pagamento = await this.pagamentoRepository.findOneBy({ id_pagamento })
    if(!pagamento) return null
    this.pagamentoRepository.merge(pagamento, dto)

    return this.pagamentoRepository.save(pagamento);
  }

  async remove(id_pagamento: number) {
    const pagamento = await this.pagamentoRepository.findOneBy({ id_pagamento })
    if(!pagamento) return null

    return this.pagamentoRepository.remove(pagamento);
  }
}
