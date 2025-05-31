import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    estado: string;

    @Column()
    bairro: string;

    @Column()
    cidade: string;

    @Column()
    rua: string;

    @Column()
    complemento: string;

    @Column()
    cep: string;
}
