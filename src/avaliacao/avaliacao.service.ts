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
    private produtoRepository: Repository<Produto>
  ){}

  async create(dto: CreateAvaliacaoDto) {
    const produto = await this.produtoRepository.findOneBy({ idProduto: dto.id_produto });
    if(!produto) return null

    const cliente = await this.clienteRepository.findOneBy({ idCliente: dto.id_cliente })
    if(!cliente) return null

    const avaliacao = this.avaliacaoRepository.create({
      ...dto,
      produto,
      cliente
    })

    return this.avaliacaoRepository.save(avaliacao)
  }

  findAll() {
    return this.avaliacaoRepository.find();
  }

  findOne(id_avaliacao: number) {
    return this.avaliacaoRepository.findOneBy({ id_avaliacao });
  }

  async update(id_avaliacao: number, dto: UpdateAvaliacaoDto) {
    const avaliacao = await this.avaliacaoRepository.findOneBy({ id_avaliacao })
    if(!avaliacao) return null
    this.avaliacaoRepository.merge(avaliacao, dto)

    return this.avaliacaoRepository.save(avaliacao);
  }

  async remove(id_avaliacao: number) {
    const avaliacao = await this.avaliacaoRepository.findOneBy({ id_avaliacao })
    if(!avaliacao) return null

    return this.avaliacaoRepository.remove(avaliacao);
  }
}
