import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Produto } from 'src/produto/entities/produto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Avaliacao {
  @PrimaryGeneratedColumn()
  id_avaliacao: number;

  @ManyToOne(() => Produto, (produto) => produto.avaliacoes)
  produto: Produto;

  @ManyToOne(() => Cliente, (cliente) => cliente.avaliacoes)
  cliente: Cliente;

  @Column()
  descricao: string;

  @Column()
  nota: number;

  @Column({ type: 'date' })
  data_avaliacao: string;
}
