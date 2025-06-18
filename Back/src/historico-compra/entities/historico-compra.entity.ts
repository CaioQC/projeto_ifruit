import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';

@Entity()
export class HistoricoCompra {
  @PrimaryColumn()
  id_historico_compra: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.historicoCompra)
  cliente: Cliente;

  @OneToOne(() => Pedido, (pedido) => pedido.historicoCompra)
  @JoinColumn()
  pedido: Pedido;

  @Column()
  data_compra: string;
}
