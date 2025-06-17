import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cancha } from './entities/cancha.entity';
import { CreateCanchaDto } from './dto/create-cancha.dto';
import { UpdateCanchaDto } from './dto/update-cancha.dto';

@Injectable()
export class CanchaService {
  constructor(
    @InjectRepository(Cancha)
    private readonly canchaRepository: Repository<Cancha>,
  ) {}

  async create(createCanchaDto: CreateCanchaDto): Promise<Cancha> {
    const cancha = this.canchaRepository.create(createCanchaDto);
    return this.canchaRepository.save(cancha);
  }

  async findAll(): Promise<Cancha[]> {
    return this.canchaRepository.find();
  }

  async findOne(id: number): Promise<Cancha> {
    const cancha = await this.canchaRepository.findOneBy({ id });
    if (!cancha) throw new NotFoundException(`Cancha con ID ${id} no encontrada`);
    return cancha;
  }

  async update(id: number, updateCanchaDto: UpdateCanchaDto): Promise<Cancha> {
    const cancha = await this.findOne(id);
    const updated = Object.assign(cancha, updateCanchaDto);
    return this.canchaRepository.save(updated);
  }

  async remove(id: number): Promise<{ message: string }> {
    const cancha = await this.findOne(id);
    await this.canchaRepository.remove(cancha);
    return { message: `Cancha con ID ${id} eliminada` };
  }
}
