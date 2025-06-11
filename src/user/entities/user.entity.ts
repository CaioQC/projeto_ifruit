import { Column, Entity, PrimaryGeneratedColumn, TableInheritance } from "typeorm";

export enum UserRole {
  USER = 'USER', //esse é o cliente
  MANAGER = 'MANAGER', // esse é a loja
  ADMIN = 'ADMIN', // esse é o admin geral
  DELIVERY = 'DELIVERY' // esse é o entregador
  
}

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export abstract class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  senha: string;

  @Column({
  type: 'varchar',
  default: UserRole.USER
  })
  role: UserRole;

}