import { Injectable } from '@nestjs/common';
import { CreateStatusDto } from './dto/create-status.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Status } from './entities/status.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private statusRepository: Repository<Status>
  ){}

  create(dto: CreateStatusDto) {
    try{
      const status = this.statusRepository.create(dto)
    
      return this.statusRepository.save(status);
    }

    catch(error){
      console.error(error);
    }
  }

  findAll() {
    try{
      return this.statusRepository.find();
    }

    catch(error){
      console.error(error);
    }
  }

  findOne(id_status: number) {
    try{ 
      return this.statusRepository.findOneBy({ id_status });
    }

    catch(error){
      console.error(error);
    }
  }

  async update(id_status: number, dto: UpdateStatusDto) {

  }

  async remove(id_status: number) {
    try{
      const status = await this.statusRepository.findOneBy({ id_status })
      if(!status) return null
  
      return this.statusRepository.remove(status);
    }

    catch(error){
      console.error(error);
    }
  }
}