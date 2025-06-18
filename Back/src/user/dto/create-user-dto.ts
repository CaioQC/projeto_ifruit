import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { UserRole } from '../entities/user.entity';
import { IsEnum } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  @IsEnum(UserRole)
  role: UserRole;

  @IsOptional()
  nome?: string;

  @IsOptional()
  telefone?: string;

  @IsOptional()
  endereco?: string;

  @IsOptional()
  dados_bancarios?: string;

  @IsOptional()
  cpf?: string;

  @IsOptional()
  veiculo?: string;
}
