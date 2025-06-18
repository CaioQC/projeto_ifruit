import { Injectable } from '@nestjs/common';
import { CreateAvaliacaoDto } from './dto/create-avaliacao.dto';
import { UpdateAvaliacaoDto } from './dto/update-avaliacao.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Avaliacao } from './entities/avaliacao.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Produto } from 'src/produto/entities/produto.entity';

@Injectable()
export class AvaliacaoService {
  constructor(
    @InjectRepository(Avaliacao)
    private avaliacaoRepository: Repository<Avaliacao>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
  ) {}

  async create(dto: CreateAvaliacaoDto) {
    try {
      const produto = await this.produtoRepository.findOneBy({
        idProduto: dto.id_produto,
      });
      if (!produto) return null;

      const cliente = await this.clienteRepository.findOneBy({
        id: dto.id_cliente,
      });
      if (!cliente) return null;

      const avaliacao = this.avaliacaoRepository.create({
        ...dto,
        produto,
        cliente,
      });

      return this.avaliacaoRepository.save(avaliacao);
    } catch (error) {
      console.error(error);
    }
  }

  findAll() {
    try {
      return this.avaliacaoRepository.find({
        relations: ['cliente', 'produto'],
      });
    } catch (error) {
      console.error(error);
    }
  }

  findOne(id_avaliacao: number) {
    try {
      return this.avaliacaoRepository.findOne({
        where: { id_avaliacao: id_avaliacao },
        relations: ['cliente', 'produto'],
      });
    } catch (error) {
      console.error(error);
    }
  }

  async update(id_avaliacao: number, dto: UpdateAvaliacaoDto) {
    try {
      const avaliacao = await this.avaliacaoRepository.findOneBy({
        id_avaliacao,
      });
      if (!avaliacao) return null;
      this.avaliacaoRepository.merge(avaliacao, dto);

      return this.avaliacaoRepository.save(avaliacao);
    } catch (error) {
      console.error(error);
    }
  }

  async remove(id_avaliacao: number) {
    try {
      const avaliacao = await this.avaliacaoRepository.findOneBy({
        id_avaliacao,
      });
      if (!avaliacao) return null;

      return this.avaliacaoRepository.remove(avaliacao);
    } catch (error) {
      console.error(error);
    }
  }
}
