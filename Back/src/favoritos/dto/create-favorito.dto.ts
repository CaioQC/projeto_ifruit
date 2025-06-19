import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateFavoritoDto {
  @IsNumber(
    {},
    { message: 'Este campo deve ser um número do id de um produto válido.' },
  )
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  id_produto: number;

  @IsNumber(
    {},
    { message: 'Este campo deve ser um número do id de um cliente válido.' },
  )
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  id_cliente: number;

  @IsDateString(
    {},
    { message: 'data_adicao deve ser uma date string ISO 8601 válida.' },
  )
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  data_adicao: string;
}
