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
import { HistoricoCompraService } from './historico-compra.service';
import { CreateHistoricoCompraDto } from './dto/create-historico-compra.dto';
import { UpdateHistoricoCompraDto } from './dto/update-historico-compra.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { UserRole } from 'src/user/entities/user.entity';

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
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.MANAGER ,UserRole.ADMIN)
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
