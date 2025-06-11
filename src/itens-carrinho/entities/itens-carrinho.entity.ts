import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Produto } from 'src/produto/entities/produto.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ItensCarrinho {
  @PrimaryGeneratedColumn()
  idItem: number;

  @ManyToOne(() => Produto, (produto) => produto.itens)
  produto: Produto;

  @ManyToOne(() => Carrinho, (carrinho) => carrinho.itens)
  carrinho: Carrinho;

  @Column()
  quantidade: number;

  @Column()
  subtotal: number;
}
