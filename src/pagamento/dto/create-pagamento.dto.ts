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
  id_status: number;

  @IsNumber(
    {},
    { message: 'Este campo deve ser um número do id de um pedido válido.' },
  )
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  id_pedido: number;

  @IsString({ message: 'Este campo deve ser uma string' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  metodo_pagamento: string;

  @IsNumber({}, { message: 'Este campo deve ser um número.' })
  @IsPositive({ message: 'Este campo deve ser um número positivo.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  valor: number;

  @IsDateString(
    {},
    { message: 'data_pagamento deve ser uma date string ISO 8601 válida.' },
  )
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  data_pagamento: string;
}
