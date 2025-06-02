import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCarrinhoDto {
    @IsNotEmpty()
    @IsNumber()
    idCliente: number;

    @IsNotEmpty()
    @IsDateString()
    dataCriacao: string;
}
