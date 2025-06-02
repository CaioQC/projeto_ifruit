import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateEnderecoDto {
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