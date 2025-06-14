import { Avaliacao } from 'src/avaliacao/entities/avaliacao.entity';
import { Carrinho } from 'src/carrinho/entities/carrinho.entity';
import { Endereco } from 'src/endereco/entities/endereco.entity';
import { Favorito } from 'src/favoritos/entities/favorito.entity';
import { HistoricoCompra } from 'src/historico-compra/entities/historico-compra.entity';
import { Pedido } from 'src/pedido/entities/pedido.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    idCliente: number;

    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    telefone: string

    @Column()
    senha: string

    @OneToMany(() => Carrinho, (carrinho) => carrinho.cliente)
    carrinhos: Carrinho[]

    @OneToMany(() => Pedido, (pedido) => pedido.cliente)
    pedidos: Pedido[]

    @OneToMany(() => HistoricoCompra, (historicoCompra) => historicoCompra.cliente)
    historicoCompra: HistoricoCompra[]

    @OneToMany(() => Avaliacao, (avaliacoes) => avaliacoes.cliente)
    avaliacoes: Avaliacao[]

    @OneToMany(() => Favorito, (favoritos) => favoritos.cliente)
    favoritos: Favorito[]

    @OneToMany(() => Endereco, (endereco) => endereco.cliente)
    enderecos: Endereco[]
}
