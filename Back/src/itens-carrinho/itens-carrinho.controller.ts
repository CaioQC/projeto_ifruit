import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ItensCarrinhoService } from './itens-carrinho.service';
import { CreateItensCarrinhoDto } from './dto/create-itens-carrinho.dto';
import { UpdateItensCarrinhoDto } from './dto/update-itens-carrinho.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/user/entities/user.entity';
import { Roles } from 'src/auth/roles.decorator';

@Controller('itens-carrinho')
export class ItensCarrinhoController {
  constructor(private readonly itensCarrinhoService: ItensCarrinhoService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
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
