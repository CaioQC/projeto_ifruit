/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Entregador } from 'src/entregador/entities/entregador.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user-dto';
import { UserRole } from 'src/user/entities/user.entity';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async hashPassword(senha: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(senha, salt, 32)) as Buffer;
    return `${salt}.${hash.toString('hex')}`;
  }

  async signUp(dto: CreateUserDto) {
    const { email, senha, role, nome, telefone, endereco, dados_bancarios, cpf, veiculo } = dto;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email em uso');
    }

    // Exemplo de regra: para USER (cliente), nome e telefone são obrigatórios
    if (role === UserRole.USER && (!nome || !telefone)) {
      throw new BadRequestException('Nome e telefone são obrigatórios para clientes.');
    }

    const senhaHash = await this.hashPassword(senha);

    let user: Cliente | Entregador | Loja;

    switch (role) {
      case UserRole.USER:
        user = Object.assign(new Cliente(), {
          email,
          senha: senhaHash,
          nome,
          telefone,
          role,
        });
        break;

      case UserRole.MANAGER:
        user = Object.assign(new Loja(), {
          email,
          senha: senhaHash,
          telefone,
          endereco,
          dados_bancarios,
          nome,
          role,
        });
        break;

      case UserRole.DELIVERY:
      user = Object.assign(new Entregador(), {
        email,
        senha: senhaHash,
        nome,
        telefone,
        cpf,
        veiculo,
        dados_bancarios,
        role,
      });
      break;

      case UserRole.ADMIN:
        // Se tiver entidade específica para admin, ou use Cliente/Loja
        // Ajuste conforme seu modelo de negócio
        user = Object.assign(new Cliente(), {
          email,
          senha: senhaHash,
          nome,
          telefone,
          role,
        });
        break;

      default:
        throw new BadRequestException('Tipo de usuário inválido');
    }

    const savedUser = await this.userService.save(user);
    const { senha: _, ...result } = savedUser;
    return result;
  }

  async singIn(email: string, senha: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const [salt, storedHash] = user.senha.split('.');
    const hash = (await scrypt(senha, salt, 32)) as Buffer;

    if (storedHash !== hash.toString('hex')) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = {
      username: user.email,
      sub: user.id,
      role: user.role, // já é UserRole enum
    };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
