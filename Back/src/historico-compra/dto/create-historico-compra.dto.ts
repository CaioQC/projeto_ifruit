import { IsDateString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHistoricoCompraDto {
  @IsNumber(
    {},
    { message: 'Este campo deve ser um número do id de um cliente válido.' },
  )
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  id_cliente: number;

  @IsNumber(
    {},
    { message: 'Este campo deve ser um número do id de um pedido válido.' },
  )
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  id_pedido: number;

  @IsDateString(
    {},
    { message: 'data_compra deve ser uma date string ISO 8601 válida.' },
  )
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  data_compra: string;
}
