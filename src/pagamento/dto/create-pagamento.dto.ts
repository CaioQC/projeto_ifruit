import { IsString, IsNumber, IsPositive, IsDateString } from 'class-validator';

export class CreatePagamentoDto {
    @IsString()
    metodo_pagamento: string;

    @IsNumber()
    @IsPositive()
    valor: number;

    @IsDateString()
    data_pagamento: string;
}
