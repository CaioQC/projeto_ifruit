import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateClienteDto {
    @IsString()
    nome: string

    @IsEmail()
    email: string

    @IsPhoneNumber()
    telefone: string

    @IsString()
    senha: string
}

