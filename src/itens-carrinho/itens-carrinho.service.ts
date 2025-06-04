import { Injectable } from '@nestjs/common';
import { CreateItensCarrinhoDto } from './dto/create-itens-carrinho.dto';
import { UpdateItensCarrinhoDto } from './dto/update-itens-carrinho.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ItensCarrinho } from './entities/itens-carrinho.entity';
import { Repository } from 'typeorm';
import { Produto } from 'src/produto/entities/produto.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';

@Injectable()
export class ItensCarrinhoService {
  constructor(
    @InjectRepository(ItensCarrinho)
    private itemRepository: Repository<ItensCarrinho>,
    @InjectRepository(Produto)
    private produtoRepository:  Repository<Produto>,
    @InjectRepository(Carrinho)
    private carrinhoRepository: Repository<Carrinho>
  ){}

  async create(dto: CreateItensCarrinhoDto) {
    const produto = await this.produtoRepository.findOneBy({ idProduto: dto.idProduto })
    if(!produto) return null

    const carrinho = await this.carrinhoRepository.findOneBy({ idCarrinho: dto.idCarrinho })
    if(!carrinho) return null

    const item = this.itemRepository.create({
      ...dto,
      produto,
      carrinho
    })

    return this.itemRepository.save(item);
  }

  findAll() {
    return this.itemRepository.find();
  }

  findOne(idItem: number) {
    return this.itemRepository.findOneBy({ idItem });
  }

  async update(idItem: number, dto: UpdateItensCarrinhoDto) {
    const item = await this.itemRepository.findOneBy({ idItem })
    if(!item) return null
    this.itemRepository.merge(item, dto)
    return this.itemRepository.save(item);
  }

  async remove(idItem: number) {
    const item = await this.itemRepository.findOneBy({ idItem })
    if(!item) return null
    return this.itemRepository.remove(item);
  }
}