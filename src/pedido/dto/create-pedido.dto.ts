import { IsNumber, IsPositive, IsDateString } from 'class-validator';

export class CreatePedidoDto {
    @IsNumber()
    @IsPositive()
    valor_total: number;

    @IsDateString()
    data_pedido: string;
}
