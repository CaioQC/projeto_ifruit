import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Produto } from 'src/produto/entities/produto.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Favorito {
  @PrimaryGeneratedColumn()
  id_favorito: number;

  @ManyToOne(() => Produto, (produto) => produto.favorito)
  produto: Produto;

  @ManyToOne(() => Cliente, (cliente) => cliente.favoritos)
  cliente: Cliente;

  @Column()
  data_adicao: string;
}
