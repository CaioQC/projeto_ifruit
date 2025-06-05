import { IsString, IsEmail, IsPhoneNumber, IsNumber } from 'class-validator';

export class CreateEnderecoDto {
    @IsNumber()
    id_cliente: number

    @IsString()
    estado: string

    @IsString()
    cidade: string

    @IsString()
    bairro: string

    @IsString()
    rua: string

    @IsString()
    complemento: string

    @IsString()
    cep: string
}