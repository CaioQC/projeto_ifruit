import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Status } from 'src/status/entities/status.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class Pagamento {
    @PrimaryGeneratedColumn()
    id_pagamento: number;

    @OneToOne(() => Pedido, (pedido) => pedido.pagamento)
    @JoinColumn()
    pedido: Pedido

    @Column()
    metodo_pagamento: string;

    @Column('decimal', { precision: 10, scale: 2 })
    valor: number;

    @Column({ type: 'date' })
    data_pagamento: string;

    @ManyToOne(() => Status, (status) => status.pagamentos)
    status: Status
}
