import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Endereco {
    @PrimaryGeneratedColumn()
    idEndereco: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.enderecos)
    cliente: Cliente;

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
