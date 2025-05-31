import { Injectable } from '@nestjs/common';
import { CreateHistoricoCompraDto } from './dto/create-historico-compra.dto';
import { UpdateHistoricoCompraDto } from './dto/update-historico-compra.dto';

@Injectable()
export class HistoricoCompraService {
  create(createHistoricoCompraDto: CreateHistoricoCompraDto) {
    return 'This action adds a new historicoCompra';
  }

  findAll() {
    return `This action returns all historicoCompra`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historicoCompra`;
  }

  update(id: number, updateHistoricoCompraDto: UpdateHistoricoCompraDto) {
    return `This action updates a #${id} historicoCompra`;
  }

  remove(id: number) {
    return `This action removes a #${id} historicoCompra`;
  }
}
