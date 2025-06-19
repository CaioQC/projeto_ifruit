import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class CreateEntregadorDto {
  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  nome: string;

  @IsEmail({}, { message: 'Este campo deve ser um email válido.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  email: string;

  @IsPhoneNumber('BR', {
    message: 'Este campo deve ser um número de telefone válido.',
  })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  telefone: string;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  senha: string;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  cpf: string; // Não existe @IsCPF oficial, mas podemos validar manualmente depois

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  dados_bancarios: string;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  veiculo: string;
}
