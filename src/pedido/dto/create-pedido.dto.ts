import { IsNumber, IsPositive, IsDateString, IsNotEmpty } from 'class-validator';

export class CreatePedidoDto {
    @IsNumber({}, { message : "Este campo deve ser um número do id de um carrinho válido." })
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    id_carrinho: number

    @IsNumber({}, { message : "Este campo deve ser um número do id de um cliente válido." })
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    id_cliente: number

    @IsNumber({}, { message : "Este campo deve ser um número do id de um entregador válido." })
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    id_entregador: number

    @IsNumber({}, { message : "Este campo deve ser um número do id de um status válido." })
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    id_status: number

    @IsNumber({}, { message : "Este campo deve ser um número." })
    @IsPositive({ message : "Este campo deve ser um número positivo." })
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    valor_total: number;

    @IsDateString()
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    data_pedido: string;
}
