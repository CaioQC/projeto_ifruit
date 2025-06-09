import { Injectable } from '@nestjs/common';
import { CreateLojaDto } from './dto/create-loja.dto';
import { UpdateLojaDto } from './dto/update-loja.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Loja } from './entities/loja.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LojaService {
  constructor(@InjectRepository(Loja)
  private readonly repository: Repository<Loja>) { }

  create(createLojaDto: CreateLojaDto) {
    try{
      const Loja = this.repository.create(createLojaDto);
      return this.repository.save(Loja);
    }

    catch(error){
      console.error(error);
    }
  }

  findAll() {
    try{
      return this.repository.find();
    }

    catch(error){
      console.error(error);
    }
  }

  findOne(id: number) {
    try{
      return this.repository.findOneBy({ id_Loja: id });
    }

    catch(error){
      console.error(error);
    }
  }

  async update(id: number, dto: UpdateLojaDto) {
    try{
      const loja = await this.repository.findOneBy({ id_Loja: id });
      if (!loja) return null;
      this.repository.merge(loja, dto);
      return this.repository.save(loja);
    }

    catch(error){
      console.error(error);
    }
  }

  async remove(id: number) {
    try{
      const loja = await this.repository.findOneBy({ id_Loja: id });
      if (!loja) return null;
      return this.repository.remove(loja);
    }

    catch(error){
      console.error(error);
    }
  }
}
