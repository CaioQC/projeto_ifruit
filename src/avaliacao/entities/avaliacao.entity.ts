import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Avaliacao {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    descricao: string;

    @Column()
    nota: number;

    @Column({ type: 'date' })
    data_avaliacao: string;
}
