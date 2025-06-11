import { Avaliacao } from 'src/avaliacao/entities/avaliacao.entity';
import { Favorito } from 'src/favoritos/entities/favorito.entity';
import { ItensCarrinho } from 'src/itens-carrinho/entities/itens-carrinho.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity()
export class Produto {
  @PrimaryGeneratedColumn()
  idProduto: number;

  @Column()
  nome: string;

  @Column()
  descricao: string;

  @Column()
  preco: number;

  @Column()
  quantidade: number;

  @Column()
  categoria: string;

  @ManyToOne(() => Loja, (loja) => loja.produtos, {
    onDelete: 'CASCADE',
    eager: true,
  })
  loja: Loja;
  static loja: any;

  @OneToMany(() => ItensCarrinho, (itensCarrinho) => itensCarrinho.produto)
  itens: ItensCarrinho;

  @OneToMany(() => Avaliacao, (avaliacoes) => avaliacoes.produto)
  avaliacoes: Avaliacao[];

  @OneToMany(() => Favorito, (favorito) => favorito.produto)
  favorito: Favorito[];
}
