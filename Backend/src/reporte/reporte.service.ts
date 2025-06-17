import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reporte } from './entities/reporte.entity';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';

@Injectable()
export class ReporteService {
  constructor(
    @InjectRepository(Reporte)
    private reporteRepository: Repository<Reporte>,
  ) {}

  async create(createReporteDto: CreateReporteDto): Promise<Reporte> {
    const reporte = this.reporteRepository.create(createReporteDto);
    return this.reporteRepository.save(reporte);
  }

  findAll(): Promise<Reporte[]> {
    return this.reporteRepository.find();
  }

  async findOne(id: number): Promise<Reporte> {
    const reporte = await this.reporteRepository.findOneBy({ id });
    if (!reporte) {
      throw new NotFoundException(`Reporte con ID ${id} no encontrado`);
    }
    return reporte;
  }

  async update(id: number, updateReporteDto: UpdateReporteDto): Promise<Reporte> {
    const reporte = await this.findOne(id);
    Object.assign(reporte, updateReporteDto);
    return this.reporteRepository.save(reporte);
  }

  async remove(id: number): Promise<{ message: string }> {
    const reporte = await this.findOne(id);
    await this.reporteRepository.remove(reporte);
    return { message: `Reporte con ID ${id} eliminado` };
  }
}
