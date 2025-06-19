import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEnderecoDto {
  @IsNotEmpty({ message: 'id_cliente é campo obrigatório.' })
  @IsNumber(
    {},
    { message: 'id_cliente deve ser o número do id de um cliente válido.' },
  )
  @ApiProperty()
  id_cliente: number;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  estado: string;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  cidade: string;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  bairro: string;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  rua: string;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @ApiProperty()
  complemento: string;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  cep: string;
}
