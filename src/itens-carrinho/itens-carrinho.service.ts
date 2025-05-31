import { Injectable } from '@nestjs/common';
import { CreateItensCarrinhoDto } from './dto/create-itens-carrinho.dto';
import { UpdateItensCarrinhoDto } from './dto/update-itens-carrinho.dto';

@Injectable()
export class ItensCarrinhoService {
  create(createItensCarrinhoDto: CreateItensCarrinhoDto) {
    return 'This action adds a new itensCarrinho';
  }

  findAll() {
    return `This action returns all itensCarrinho`;
  }

  findOne(id: number) {
    return `This action returns a #${id} itensCarrinho`;
  }

  update(id: number, updateItensCarrinhoDto: UpdateItensCarrinhoDto) {
    return `This action updates a #${id} itensCarrinho`;
  }

  remove(id: number) {
    return `This action removes a #${id} itensCarrinho`;
  }
}
