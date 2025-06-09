import { IsString, IsInt, IsDateString, IsNumber, MaxLength, Min, Max, IsNotEmpty } from 'class-validator';

export class CreateAvaliacaoDto {
    @IsNumber({}, { message : "id_cliente precisa ser um número de id válido" })
    @IsNotEmpty({ message : "Esse campo é obrigatório." })
    @IsInt({ message : "O número deve ser um inteiro." })
    id_cliente: number

    @IsNumber({}, { message : "id_produto precisa ser um número de id válido" })
    @IsNotEmpty({ message : "Esse campo é obrigatório." })
    @IsInt({ message : "O número deve ser um inteiro." })
    id_produto: number

    @IsString({ message : "Este campo deve ser uma string" })
    @MaxLength(500, { message : "A descricao deve conter no máximo 500 caracteres." })
    descricao: string;

    @IsInt({ message : "O número deve ser um inteiro." })
    @Min(0)
    @Max(5)
    @IsNotEmpty({ message : "Esse campo é obrigatório." })
    nota: number;

    @IsDateString({}, { message : "data_avaliacao deve ser uma date string ISO 8601 válida." })
    @IsNotEmpty({ message : "Esse campo é obrigatório." })
    data_avaliacao: string;
}
