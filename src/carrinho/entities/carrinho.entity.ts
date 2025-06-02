import { Cliente } from "src/cliente/entities/cliente.entity";
import { ItensCarrinho } from "src/itens-carrinho/entities/itens-carrinho.entity";
import { Pedido } from "src/pedido/entities/pedido.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Carrinho {
    @PrimaryGeneratedColumn()
    idCarrinho: number;

    @ManyToOne(() => Cliente, (cliente) => cliente.carrinhos)
    cliente: Cliente

    @Column()
    dataCriacao: string

    @OneToMany(() => ItensCarrinho, (itensCarrinho) => itensCarrinho.carrinho)
    itens: ItensCarrinho[]

    @OneToOne(() => Pedido, (pedido) => pedido.carrinho)
    pedido: Pedido
}
