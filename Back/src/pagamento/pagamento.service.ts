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
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  async create(dto: CreatePagamentoDto) {
    try {
      const status = await this.statusRepository.findOneBy({
        id_status: dto.id_status,
      });
      if (!status) return null;

      const pedido = await this.pedidoRepository.findOneBy({
        id_pedido: dto.id_pedido,
      });
      if (!pedido) return null;

      const pagamento = this.pagamentoRepository.create({
        ...dto,
        pedido,
        status,
      });

      return this.pagamentoRepository.save(pagamento);
    } catch (error) {
      console.error(error);
    }
  }

  findAll() {
    try {
      return this.pagamentoRepository.find({
        relations: ['pedido', 'status'],
      });
    } catch (error) {
      console.error(error);
    }
  }

  findOne(id_pagamento: number) {
    try {
      return this.pagamentoRepository.findOne({
        where: { id_pagamento: id_pagamento },
      });
    } catch (error) {
      console.error(error);
    }
  }

  async update(id_pagamento: number, dto: UpdatePagamentoDto) {
    try {
      const pagamento = await this.pagamentoRepository.findOneBy({
        id_pagamento,
      });
      if (!pagamento) return null;
      this.pagamentoRepository.merge(pagamento, dto);

      return this.pagamentoRepository.save(pagamento);
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id_pagamento: number) {
    try {
      const pagamento = await this.pagamentoRepository.findOneBy({
        id_pagamento,
      });
      if (!pagamento) return null;

      return this.pagamentoRepository.remove(pagamento);
    } catch (error) {
      console.error(error);
    }
  }
}
