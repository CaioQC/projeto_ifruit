import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Pagamento {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    metodo_pagamento: string;

    @Column('decimal', { precision: 10, scale: 2 })
    valor: number;

    @Column({ type: 'date' })
    data_pagamento: string;
}
