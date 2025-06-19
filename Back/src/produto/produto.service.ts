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
  ) {}

  async create(dto: CreateProdutoDto) {
    try {
      const loja = await this.lojaRepository.findOneBy({
        id: dto.id_loja,
      });

      if (!loja) {
        throw new NotFoundException(
          `UF com sigla '${dto.id_loja}' não encontrada`,
        );
      }

      const produto = this.produtoRepository.create({
        ...dto,
        loja,
      });

      return this.produtoRepository.save(produto);
    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    try {
      return this.produtoRepository.find({
        relations: ['loja'],
      });
    } catch (error) {
      console.error(error);
    }
  }

  findOne(id: number) {
    try {
      return this.produtoRepository.findOne({
        where: { idProduto: id },
        relations: ['loja'],
      });
    } catch (error) {
      console.error(error);
    }
  }


    //procurando produtos de uma determinada loja
    async findByLojaId(idLoja: number) {
      try {
        return this.produtoRepository.find({
          where: { loja: { id: idLoja } },
          relations: ['loja'],
        });
      } catch (error) {
        console.error(error);
      }
    }


  async update(id: number, dto: UpdateProdutoDto) {
  try {
    const produto = await this.produtoRepository.findOneBy({ idProduto: id });
    if (!produto) return null;
    this.produtoRepository.merge(produto, dto);
    return this.produtoRepository.save(produto);
  } catch (error) {
    console.error(error);
  }
}

  async remove(id: number) {
  try {
    const produto = await this.produtoRepository.findOneBy({ idProduto: id });
    if (!produto) return null;
    return this.produtoRepository.remove(produto);
  } catch (error) {
    console.error(error);
  }
}
}
