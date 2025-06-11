import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Entregador } from 'src/entregador/entities/entregador.entity';
import { HistoricoCompra } from 'src/historico-compra/entities/historico-compra.entity';
import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { Status } from 'src/status/entities/status.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Pedido {
  @PrimaryGeneratedColumn()
  id_pedido: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos)
  cliente: Cliente;

  @OneToOne(() => Carrinho, (carrinho) => carrinho.pedido)
  @JoinColumn()
  carrinho: Carrinho;

  @ManyToOne(() => Entregador, (entregador) => entregador.pedidos)
  entregador: Entregador;

  @ManyToOne(() => Status, (status) => status.pedidos)
  status: Status;

  @Column('decimal', { precision: 10, scale: 2 })
  valor_total: number;

  @Column({ type: 'date' })
  data_pedido: string;

  @OneToOne(() => HistoricoCompra, (historicoCompra) => historicoCompra.pedido)
  historicoCompra: HistoricoCompra;

  @OneToOne(() => Pagamento, (pagamento) => pagamento.pedido)
  pagamento: Pagamento;
}
