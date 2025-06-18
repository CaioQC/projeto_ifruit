import { IsString, IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class CreateEntregadorDto {
  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  nome: string;

  @IsEmail({}, { message: 'Este campo deve ser um email válido.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  email: string;

  @IsPhoneNumber('BR', {
    message: 'Este campo deve ser um número de telefone válido.',
  })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  telefone: string;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  senha: string;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  cpf: string; // Não existe @IsCPF oficial, mas podemos validar manualmente depois

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  dados_bancarios: string;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  veiculo: string;
}
