import { Cliente } from "src/cliente/entities/cliente.entity";
import { Produto } from "src/produto/entities/produto.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Favorito {
    @PrimaryGeneratedColumn()
    id_favorito: number

    @ManyToOne(() => Produto, (produto) => produto.favoritos)
    produto: Produto

    @ManyToOne(() => Cliente, (cliente) => cliente.favoritos)
    cliente: Cliente

    @Column()
    data_adicao: string
}
