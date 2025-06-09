import { IsString, IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
    @IsString({ message : "Este campo deve ser uma string." })
    @IsNotEmpty({ message : "Esse campo é obrigatório." })
    nome: string

    @IsEmail({}, { message : "Este campo deve ser um email válido." })
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    email: string

    @IsPhoneNumber("BR")
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    telefone: string

    @IsString({ message : "Este campo deve ser uma string." })
    @IsNotEmpty({ message : "Este campo é obrigatório." })
    senha: string
}

