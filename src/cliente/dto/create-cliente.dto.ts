import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateClienteDto {
    @IsString()
    nome: string

    @IsEmail()
    email: string

    @IsPhoneNumber("BR")
    telefone: string

    @IsString()
    senha: string
}

