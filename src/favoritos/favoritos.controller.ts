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
import { FavoritosService } from './favoritos.service';
import { CreateFavoritoDto } from './dto/create-favorito.dto';
import { UpdateFavoritoDto } from './dto/update-favorito.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { UserRole } from 'src/user/entities/user.entity';

@Controller('favoritos')
export class FavoritosController {
  constructor(private readonly favoritosService: FavoritosService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  create(@Body() createFavoritoDto: CreateFavoritoDto) {
    return this.favoritosService.create(createFavoritoDto);
  }

  @Get()
  findAll() {
    return this.favoritosService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(UserRole.USER)
  findOne(@Param('id') id: string) {
    return this.favoritosService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFavoritoDto: UpdateFavoritoDto,
  ) {
    return this.favoritosService.update(+id, updateFavoritoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.favoritosService.remove(+id);
  }
}
