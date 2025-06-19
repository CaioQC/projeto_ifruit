import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsDateString,
  IsNotEmpty,
} from 'class-validator';

export class CreatePagamentoDto {
  @IsNumber(
    {},
    { message: 'Este campo deve ser um número do id de um status válido.' },
  )
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  id_status: number;

  @IsNumber(
    {},
    { message: 'Este campo deve ser um número do id de um pedido válido.' },
  )
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  id_pedido: number;

  @IsString({ message: 'Este campo deve ser uma string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  metodo_pagamento: string;

  @IsNumber({}, { message: 'Este campo deve ser um número.' })
  @IsPositive({ message: 'Este campo deve ser um número positivo.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  valor: number;

  @IsDateString(
    {},
    { message: 'data_pagamento deve ser uma date string ISO 8601 válida.' },
  )
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  data_pagamento: string;
}
