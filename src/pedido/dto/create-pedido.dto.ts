import { IsNumber, IsPositive, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePedidoDto {
    @IsNumber()
    @IsNotEmpty()
    id_carrinho: number

    @IsNumber()
    @IsNotEmpty()
    id_cliente: number

    @IsNumber()
    @IsNotEmpty()
    id_entregador: number

    @IsNumber()
    @IsNotEmpty()
    id_status: number

    @IsNumber()
    @IsPositive()
    valor_total: number;

    @IsDateString()
    data_pedido: string;
}
