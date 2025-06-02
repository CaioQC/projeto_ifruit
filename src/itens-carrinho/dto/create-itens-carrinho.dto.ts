import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateItensCarrinhoDto {
    @IsNotEmpty()
    @IsNumber()
    idCarrinho: number

    @IsNotEmpty()
    @IsNumber()
    idProduto: number

    @IsNotEmpty()
    @IsNumber()
    quantidade: number
}
