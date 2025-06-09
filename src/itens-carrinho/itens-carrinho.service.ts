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
    try{
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

    catch(error){
      console.error(error);
    }
  }

  findAll() {
    try{
      return this.itemRepository.find({
        relations : ["carrinho", "produto"]
      });
    }

    catch(error){
      console.error(error);
    }
  }

  findOne(idItem: number) {
    try{
      return this.itemRepository.findOne({ 
        where : { idItem : idItem },
        relations : ["carrinho", "produto"]
      });
    }

    catch(error){
      console.error(error);
    }
  }

  async update(idItem: number, dto: UpdateItensCarrinhoDto) {
    try{
      const item = await this.itemRepository.findOneBy({ idItem })
      if(!item) return null
      this.itemRepository.merge(item, dto)
      return this.itemRepository.save(item);
    }

    catch(error){
      console.error(error);
    }
  }

  async remove(idItem: number) {
    try{
      const item = await this.itemRepository.findOneBy({ idItem })
      if(!item) return null
      return this.itemRepository.remove(item);
    }

    catch(error){
      console.error(error);
    }
  }
}