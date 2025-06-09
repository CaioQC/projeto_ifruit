import { IsDateString, IsNotEmpty, IsNumber } from "class-validator";

export class CreateCarrinhoDto {
    @IsNotEmpty({ message : "idCliente é campo obrigatório." })
    @IsNumber({}, { message : "idCliente deve ser o número do id de um cliente válido." })
    idCliente: number;

    @IsNotEmpty({ message : "dataCriacao é campo obrigatório." })
    @IsDateString({}, { message : "dataCriacao deve ser uma date string ISO 8601 válida." })
    dataCriacao: string;
}
