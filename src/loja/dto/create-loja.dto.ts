import { IsString, IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class CreateLojaDto {
  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  nome: string;

  @IsString({ message: 'Este campo deve ser uma string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  endereco: string;

  @IsEmail({}, { message: 'Este campo deve ser um email válido.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  email: string;

  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @IsPhoneNumber('BR', {
    message: 'Este campo deve ser um número de telefone válido.',
  })
  telefone: string;

  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @IsString({ message: 'Este campo deve ser uma string.' })
  senha: string;

  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @IsString({ message: 'Este campo deve ser uma string.' })
  dados_bancarios: string;
}
