import { Pedido } from 'src/pedido/entities/pedido.entity';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, OneToMany } from 'typeorm';

@Entity()
export class Entregador extends User{

  @Column()
  nome: string;

  @Column()
  telefone: string;

  @Column()
  cpf: string;

  @Column()
  dados_bancarios: string;

  @Column()
  veiculo: string;

  @OneToMany(() => Pedido, (pedidos) => pedidos.entregador)
  pedidos: Pedido[];
}
