import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoricoCompraService } from './historico-compra.service';
import { CreateHistoricoCompraDto } from './dto/create-historico-compra.dto';
import { UpdateHistoricoCompraDto } from './dto/update-historico-compra.dto';

@Controller('historico-compra')
export class HistoricoCompraController {
  constructor(
    private readonly historicoCompraService: HistoricoCompraService,
  ) {}

  @Post()
  create(@Body() createHistoricoCompraDto: CreateHistoricoCompraDto) {
    return this.historicoCompraService.create(createHistoricoCompraDto);
  }

  @Get()
  findAll() {
    return this.historicoCompraService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historicoCompraService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHistoricoCompraDto: UpdateHistoricoCompraDto,
  ) {
    return this.historicoCompraService.update(+id, updateHistoricoCompraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historicoCompraService.remove(+id);
  }
}
