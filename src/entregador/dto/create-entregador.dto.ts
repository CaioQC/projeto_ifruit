import { IsString, IsEmail, IsPhoneNumber } from 'class-validator';

export class CreateEntregadorDto {
    @IsString()
    nome: string;

    @IsEmail()
    email: string;

    @IsPhoneNumber('BR')
    telefone: string;

    @IsString()
    senha: string;

    @IsString()
    cpf: string; // Não existe @IsCPF oficial, mas podemos validar manualmente depois

    @IsString()
    dados_bancarios: string;

    @IsString()
    veiculo: string;
}
