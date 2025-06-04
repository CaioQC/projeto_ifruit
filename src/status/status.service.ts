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
    const status = this.statusRepository.create(dto)

    return this.statusRepository.save(status);
  }

  findAll() {
    return this.statusRepository.find();
  }

  findOne(id_status: number) {
    return this.statusRepository.findOneBy({ id_status });
  }

  async update(id_status: number, dto: UpdateStatusDto) {
    // return this.;
  }

  async remove(id_status: number) {
    const status = await this.statusRepository.findOneBy({ id_status })
    if(!status) return null

    return this.statusRepository.remove(status);
  }
}
