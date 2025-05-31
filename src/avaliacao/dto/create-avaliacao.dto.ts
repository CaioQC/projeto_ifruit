import { IsString, IsInt, Min, Max, IsDateString } from 'class-validator';

export class CreateAvaliacaoDto {
    @IsString()
    descricao: string;

    @IsInt()
    nota: number;

    @IsDateString()
    data_avaliacao: string;
}
