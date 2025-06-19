import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class CreateItensCarrinhoDto {
  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @IsNumber(
    {},
    { message: 'Este campo deve ser o número do id de um carrinho válido.' },
  )
  @ApiProperty()
  idCarrinho: number;

  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @IsNumber(
    {},
    { message: 'Este campo deve ser um número do id de um produto válido.' },
  )
  @ApiProperty()
  idProduto: number;

  @IsNotEmpty({ message: 'Este campo é obrigatório.' })
  @IsNumber({}, { message: 'Este campo deve ser um número' })
  @IsPositive({ message: 'O número deve ser positivo e maior que 0' })
  @ApiProperty()
  quantidade: number;
}
