import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateClienteDto {
    @IsString()
    nome: string

    @IsEmail()
    email: string

    @IsPhoneNumber()
    phone: string

    @IsString()
    senha: string
}

