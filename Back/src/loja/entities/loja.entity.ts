import { Produto } from 'src/produto/entities/produto.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Loja extends User{

  @Column()
  nome: string;

  @Column()
  endereco: string;


  @Column()
  telefone: string;

  @Column()
  dados_bancarios: string;

  @OneToMany(() => Produto, (produto) => produto.loja)
produtos: Produto[];
}
