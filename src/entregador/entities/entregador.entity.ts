import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Entregador {
    @PrimaryGeneratedColumn()
    idEntregador: number;

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

    @OneToMany(() => Pedido, (pedidos) => pedidos.entregador)
    pedidos: Pedido[]
}
