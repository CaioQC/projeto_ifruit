import { IsString, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class CreatePagamentoDto {
    @IsNumber()
    id_status: number

    @IsNumber()
    id_pedido: number

    @IsString()
    metodo_pagamento: string;

    @IsNumber()
    @IsPositive()
    valor: number;

    @IsDateString()
    data_pagamento: string;
}
