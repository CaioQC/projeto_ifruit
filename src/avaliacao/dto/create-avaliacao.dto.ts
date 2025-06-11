import {
  IsString,
  IsInt,
  IsDateString,
  IsNumber,
  MaxLength,
  Min,
  Max,
  IsNotEmpty,
} from 'class-validator';

export class CreateAvaliacaoDto {
  @IsNumber({}, { message: 'id_cliente precisa ser um número de id válido' })
  @IsNotEmpty({ message: 'id_cliente é um campo obrigatório.' })
  @IsInt({ message: 'id_cliente deve ser um número inteiro.' })
  id_cliente: number;

  @IsNumber({}, { message: 'id_produto precisa ser um número de id válido' })
  @IsNotEmpty({ message: 'id_produto é campo obrigatório.' })
  @IsInt({ message: 'O número do id_produto deve ser um inteiro.' })
  id_produto: number;

  @IsString({ message: 'descricao deve ser uma string' })
  @MaxLength(500, {
    message: 'A descricao deve conter no máximo 500 caracteres.',
  })
  descricao: string;

  @IsInt({ message: 'nota deve ser um inteiro.' })
  @Min(0)
  @Max(5)
  @IsNotEmpty({ message: 'nota é campo obrigatório.' })
  nota: number;

  @IsDateString(
    {},
    { message: 'data_avaliacao deve ser uma date string ISO 8601 válida.' },
  )
  @IsNotEmpty({ message: 'data_avaliacao é campo obrigatório.' })
  data_avaliacao: string;
}
