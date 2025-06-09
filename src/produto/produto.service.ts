import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Repository } from 'typeorm';
import { Loja } from 'src/loja/entities/loja.entity';

@Injectable()
export class ProdutoService {
  repository: any;
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,

    @InjectRepository(Loja)
    private readonly lojaRepository: Repository<Loja>,
  ){}


  async create(dto: CreateProdutoDto) {
    try{
      const loja = await this.lojaRepository.findOneBy({ id_Loja: dto.id_loja });
  
      if (!loja) {
        throw new NotFoundException(`UF com sigla '${dto.id_loja}' não encontrada`);
      }
  
      const produto = this.produtoRepository.create({
        ...dto,
        loja
      })

      return this.produtoRepository.save(produto);
    }

    catch(error){
      console.error(error);
    }
  }

  async findAll() {
    try{
      return this.produtoRepository.find({
        relations: ['loja'],
      });
    }

    catch(error){
      console.error(error);
    }
  }


  findOne(id: number) {
    try{
      return this.produtoRepository.findOne({ 
        where : { idProduto: id },
        relations : ["loja"]
      });
    }

    catch(error){
      console.error(error);
    }
  }

  async update(id: number, dto: UpdateProdutoDto) {
    try{
      const Produto = await this.produtoRepository.findOneBy({ idProduto: id });
      if (!Produto) return null;
      this.repository.merge(Produto, dto);
      return this.repository.save(Produto);
    }

    catch(error){
      console.error(error);
    }
  }

  async remove(id: number) {
    try{
      const Produto = await this.produtoRepository.findOneBy({ idProduto: id });
      if (!Produto) return null;
      return this.repository.remove(Produto);
    }

    catch(error){
      console.error(error);
    }
  }
}
