import { IsNotEmpty, IsString } from 'class-validator';
import { StatusPagamento, StatusPedido } from '../entities/status.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateStatusDto {
  @IsNotEmpty({ message: 'Este campo é obrigatório' })
  @IsString()
  @ApiProperty()
  estado: StatusPedido | StatusPagamento;
}
