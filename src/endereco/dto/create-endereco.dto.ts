import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateEnderecoDto {
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    @IsNumber({}, { message : "Este campo deve ser o número do id de um cliente válido." })
    id_cliente: number

    @IsString({ message : "Este campo deve ser uma string." })
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    estado: string

    @IsString({ message : "Este campo deve ser uma string." })
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    cidade: string

    @IsString({ message : "Este campo deve ser uma string." })
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    bairro: string

    @IsString({ message : "Este campo deve ser uma string." })
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    rua: string

    @IsString({ message : "Este campo deve ser uma string." })
    complemento: string

    @IsString({ message : "Este campo deve ser uma string." })
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    cep: string
}