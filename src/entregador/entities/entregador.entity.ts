import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Entregador {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column()
    senha: string;

    @Column()
    cpf: string;

    @Column()
    dados_bancarios: string;

    @Column()
    veiculo: string;
}
