import { IsString, IsEmail, IsPhoneNumber, IsNotEmpty } from 'class-validator';

export class CreateClienteDto {
    @IsString({ message : "nome deve ser uma string." })
    @IsNotEmpty({ message : "nome é campo obrigatório." })
    nome: string

    @IsEmail({}, { message : "Este campo deve ser um email válido." })
    @IsNotEmpty({ message : "email é campo obrigatório." })
    email: string

    @IsPhoneNumber("BR")
    @IsNotEmpty({ message : "telefone é campo obrigatório." })
    telefone: string

    @IsString({ message : "senha deve ser uma string." })
    @IsNotEmpty({ message : "senha é campo obrigatório." })
    senha: string
}

