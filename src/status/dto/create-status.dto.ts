import { IsString } from 'class-validator';
import { StatusPagamento, StatusPedido } from '../entities/status.entity';

export class CreateStatusDto {
    @IsString()
    estado: StatusPedido | StatusPagamento;
}
