import { Injectable } from '@nestjs/common';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorito } from './entities/favorito.entity';
import { Repository } from 'typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Produto } from 'src/produto/entities/produto.entity';

@Injectable()
export class FavoritosService {
  constructor(
    @InjectRepository(Favorito)
    private favoritoRepository: Repository<Favorito>,

    @InjectRepository(Cliente)
    private clienteRepository: Repository<Cliente>,

    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>
  ){}

  async create(dto: CreateFavoritoDto) {
    const produto = await this.produtoRepository.findOneBy({ idProduto: dto.id_produto });
    if(!produto) return null

    const cliente = await this.clienteRepository.findOneBy({ idCliente: dto.id_cliente })
    if(!cliente) return null

    const favorito = this.favoritoRepository.create({
      ...dto,
      produto,
      cliente
    })

    return this.favoritoRepository.save(favorito);
  }

  findAll() {
    return this.favoritoRepository.find();
  }

  findOne(id_favorito: number) {
    return this.favoritoRepository.findOneBy({ id_favorito });
  }

  async update(id_favorito: number, dto: UpdateFavoritoDto) {
    const favorito = await this.favoritoRepository.findOneBy({ id_favorito })
    if(!favorito) return null
    this.favoritoRepository.merge(favorito, dto)

    return this.favoritoRepository.save(favorito);
  }

  async remove(id_favorito: number) {
    const favorito = await this.favoritoRepository.findOneBy({ id_favorito })
    if(!favorito) return null

    return this.favoritoRepository.remove(favorito);
  }
}
