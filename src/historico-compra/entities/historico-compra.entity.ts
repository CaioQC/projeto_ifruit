import { Cliente } from "src/cliente/entities/cliente.entity";
import { Pedido } from "src/pedido/entities/pedido.entity";
import { Entity, OneToOne, PrimaryColumn } from "typeorm";

@Entity()
export class HistoricoCompra {
    @PrimaryColumn()
    id_historico_compra: number

    @OneToOne(() => Cliente, (cliente) => cliente.historicoCompra)
    cliente: Cliente

    @OneToOne(() => Pedido, (pedido) => pedido.historicoCompra)
    pedido: Pedido
}
