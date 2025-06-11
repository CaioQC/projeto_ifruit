import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

import { Cliente } from 'src/cliente/entities/cliente.entity';
import { Entregador } from 'src/entregador/entities/entregador.entity';
import { Loja } from 'src/loja/entities/loja.entity';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user-dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  // Cadastro
  async signUp(dto: CreateUserDto) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unused-vars
    const { email, senha, role, nome, telefone, endereco, dados_bancarios, cpf, veiculo } = dto;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new BadRequestException('Email em uso');
    }

    // Para clientes, nome e telefone são obrigatórios
    if (role === 'cliente' && (!nome || !telefone)) {
      throw new BadRequestException('Nome e telefone são obrigatórios para clientes.');
    }

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(senha, salt, 32)) as Buffer;
    const saltAndHash = `${salt}.${hash.toString('hex')}`;

    let user: Cliente | Entregador | Loja;

    switch (role) {
      case 'cliente':
        user = Object.assign(new Cliente(), {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          email,
          senha: saltAndHash,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          nome,
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          telefone,
        });
        break;

      case 'entregador':
        user = Object.assign(new Entregador(), {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          email,
          senha: saltAndHash,
          telefone, 
          cpf, 
          veiculo,
          nome,
          dados_bancarios
        });
        break;

      case 'loja':
        user = Object.assign(new Loja(), {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          email,
          senha: saltAndHash,
          telefone, 
          endereco, 
          dados_bancarios,
          nome
        });
        break;

      default:
        throw new BadRequestException('Tipo de usuário inválido');
    }

    const savedUser = await this.userService.save(user);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { senha: _, ...result } = savedUser;
    return result;
  }

  // Login
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
      role: user.constructor.name.toLowerCase(),
    };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
