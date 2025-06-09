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
      const Loja = await this.lojaRepository.findOneBy({ id_Loja: dto.id_loja });
  
      if (!Loja) {
        throw new NotFoundException(`UF com sigla '${dto.id_loja}' não encontrada`);
      }
  
  
      const Produto = this.produtoRepository.create(dto)
      return this.produtoRepository.save(Produto);
    }

    catch(error){
      console.error(error);
    }
  }

  async findAll(id_Loja: number) {
    try{
      return this.produtoRepository.find({
        where: { loja: { id_Loja: id_Loja } },
        relations: ['loja'],
      });
    }

    catch(error){
      console.error(error);
    }
  }


  findOne(id: number) {
    try{
      return this.produtoRepository.findOneBy({ idProduto: id });
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
