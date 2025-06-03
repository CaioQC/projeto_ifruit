import { IsDateString, IsNumber } from "class-validator"

export class CreateFavoritoDto {
        @IsNumber()
        id_produto: number
    
        @IsNumber()
        id_cliente: number
    
        @IsDateString()
        data_adicao: string
}
