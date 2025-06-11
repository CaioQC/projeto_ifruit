import { IsNotEmpty, IsString } from 'class-validator';
import { StatusPagamento, StatusPedido } from '../entities/status.entity';

export class CreateStatusDto {
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  @IsString()
  estado: StatusPedido | StatusPagamento;
}
