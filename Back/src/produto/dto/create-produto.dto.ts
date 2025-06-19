import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsPositive,
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class CreateProdutoDto {
  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  nome: string;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @ApiProperty()
  descricao: string;

  @IsNumber({}, { message: 'Este campo deve ser um número.' })
  @IsPositive({ message: 'Este campo deve ser um número positivo.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  preco: number;

  @IsInt({ message: 'Este número deve ser um inteiro.' })
  @IsPositive({ message: 'Este campo deve ser um número positivo.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  quantidade: number;

  @IsString({ message: 'Este campo deve ser uma string.' })
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  categoria: string;

  @IsNumber(
    {},
    { message: 'Este campo deve ser o número do id de uma loja válida.' },
  )
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @ApiProperty()
  id_loja: number;
}
