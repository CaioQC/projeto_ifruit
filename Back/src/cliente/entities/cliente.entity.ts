import { Avaliacao } from 'src/avaliacao/entities/avaliacao.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { Favorito } from 'src/favoritos/entities/favorito.entity';
import { HistoricoCompra } from 'src/historico-compra/entities/historico-compra.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Cliente extends User{

  @Column()
  nome?: string;

  @Column()
  telefone?: string;

  @OneToMany(() => Carrinho, (carrinho) => carrinho.cliente)
  carrinhos: Carrinho[];

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];

  @OneToMany(
    () => HistoricoCompra,
    (historicoCompra) => historicoCompra.cliente,
  )
  historicoCompra: HistoricoCompra[];

  @OneToMany(() => Avaliacao, (avaliacoes) => avaliacoes.cliente)
  avaliacoes: Avaliacao[];

  @OneToMany(() => Favorito, (favoritos) => favoritos.cliente)
  favoritos: Favorito[];

  @OneToMany(() => Endereco, (endereco) => endereco.cliente)
  enderecos: Endereco[];
}
