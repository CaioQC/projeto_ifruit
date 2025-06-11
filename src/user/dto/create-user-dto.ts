import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  senha: string;

  @IsNotEmpty()
  role: 'cliente' | 'entregador' | 'loja';

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
