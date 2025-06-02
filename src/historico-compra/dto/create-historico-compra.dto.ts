import { IsDateString, IsNumber } from "class-validator";

export class CreateHistoricoCompraDto {
    @IsNumber()
    id_cliente: number

    @IsNumber()
    id_pedido: number

    @IsDateString()
    data_compra: string
}
