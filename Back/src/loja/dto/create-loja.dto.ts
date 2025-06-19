import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class CreateLojaDto {
  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  nome: string;

  @IsString({ message: 'Este campo deve ser uma string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  endereco: string;

  @IsEmail({}, { message: 'Este campo deve ser um email válido.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  email: string;

  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @IsPhoneNumber('BR', {
    message: 'Este campo deve ser um número de telefone válido.',
  })
  @ApiProperty()
  telefone: string;

  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @IsString({ message: 'Este campo deve ser uma string.' })
  @ApiProperty()
  senha: string;

  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @IsString({ message: 'Este campo deve ser uma string.' })
  @ApiProperty()
  dados_bancarios: string;
}
