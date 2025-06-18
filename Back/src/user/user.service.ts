import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Entregador } from 'src/entregador/entities/entregador.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Cliente)
    private clienteRepo: Repository<Cliente>,
    @InjectRepository(Entregador)
    private entregadorRepo: Repository<Entregador>,
    @InjectRepository(Loja)
    private lojaRepo: Repository<Loja>,
  ) {}

  async findByEmail(email: string) {
    const user =
      (await this.clienteRepo.findOne({ where: { email } })) ||
      (await this.entregadorRepo.findOne({ where: { email } })) ||
      (await this.lojaRepo.findOne({ where: { email } }));

    return user;
  }

  async save(user: Cliente | Entregador | Loja) {
    if (user instanceof Cliente) return this.clienteRepo.save(user);
    if (user instanceof Entregador) return this.entregadorRepo.save(user);
    if (user instanceof Loja) return this.lojaRepo.save(user);
    throw new Error('Invalid user type');
  }

  async findOne(id: number) {
  const user =
    (await this.clienteRepo.findOne({ where: { id } })) ||
    (await this.entregadorRepo.findOne({ where: { id } })) ||
    (await this.lojaRepo.findOne({ where: { id } }));

  return user;
}
}
