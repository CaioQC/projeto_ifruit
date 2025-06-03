import { Module } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { Favorito } from 'src/favoritos/entities/favorito.entity';


@Module({
  imports: [TypeOrmModule.forFeature([Produto, Loja, Favorito])],
  controllers: [ProdutoController],
  providers: [ProdutoService],
  exports: [ProdutoService]
})
export class ProdutoModule {}
