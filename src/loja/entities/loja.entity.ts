import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Loja {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    endereco: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    senha: string;

    @Column()
    dados_bancarios: string;
}
