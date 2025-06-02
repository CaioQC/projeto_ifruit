import { Status } from 'src/status/entities/status.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Pagamento {
    @PrimaryGeneratedColumn()
    id_pagamento: number;

    @Column()
    metodo_pagamento: string;

    @Column('decimal', { precision: 10, scale: 2 })
    valor: number;

    @Column({ type: 'date' })
    data_pagamento: string;

    @ManyToOne(() => Status, (status) => status.pagamentos)
    status: Status
    
}
