import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ItensCarrinhoService } from './itens-carrinho.service';
import { CreateItensCarrinhoDto } from './dto/create-itens-carrinho.dto';
import { UpdateItensCarrinhoDto } from './dto/update-itens-carrinho.dto';

@Controller('itens-carrinho')
export class ItensCarrinhoController {
  constructor(private readonly itensCarrinhoService: ItensCarrinhoService) {}

  @Post()
  create(@Body() createItensCarrinhoDto: CreateItensCarrinhoDto) {
    return this.itensCarrinhoService.create(createItensCarrinhoDto);
  }

  @Get()
  findAll() {
    return this.itensCarrinhoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.itensCarrinhoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateItensCarrinhoDto: UpdateItensCarrinhoDto,
  ) {
    return this.itensCarrinhoService.update(+id, updateItensCarrinhoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.itensCarrinhoService.remove(+id);
  }
}
