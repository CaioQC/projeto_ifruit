import { IsString, IsNumber, IsPositive, IsInt } from 'class-validator';

export class CreateProdutoDto {
    @IsString()
    nome: string;

    @IsString()
    descricao: string;

    @IsNumber()
    @IsPositive()
    preco: number;

    @IsInt()
    @IsPositive()
    quantidade: number;

    @IsString()
    categoria: string;
}
