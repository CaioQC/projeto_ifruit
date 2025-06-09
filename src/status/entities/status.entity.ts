import { Pagamento } from 'src/pagamento/entities/pagamento.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

export enum StatusPedido{
    PENDENTE = "ENTREGA PENDENTE",
    CANCELADO = "ENTREGA CANCELADA",
    ENTREGUE = "PEDIDO ENTREGUE"
}

export enum StatusPagamento{
    PENDENTE = "PAGAMENTO PENDENTE",
    CANCELADO = "PAGAEMENTO CANCELADO",
    FINALIZADO = "PAGAMENTO FINALIZADO"
}

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    id_status: number;

    @Column({type: "varchar"})
    estado: StatusPedido | StatusPagamento;

    @OneToMany(() => Pedido, (pedidos) => pedidos.status)
    pedidos: Pedido[]

    @OneToMany(() => Pagamento, (pagamentos) => pagamentos.status)
    pagamentos: Pagamento[]
}
