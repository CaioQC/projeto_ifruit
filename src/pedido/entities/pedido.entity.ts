import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pedido {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('decimal', { precision: 10, scale: 2 })
    valor_total: number;

    @Column({ type: 'date' })
    data_pedido: string;
}
