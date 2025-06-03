import { IsString, IsInt, Min, Max, IsDateString, IsNumber } from 'class-validator';

export class CreateAvaliacaoDto {
    @IsNumber()
    id_cliente: number

    @IsNumber()
    id_produto: number

    @IsString()
    descricao: string;

    @IsInt()
    nota: number;

    @IsDateString()
    data_avaliacao: string;
}
