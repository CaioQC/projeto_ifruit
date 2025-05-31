import { IsString } from 'class-validator';

export class CreateStatusDto {
    @IsString()
    estado: string;
}
