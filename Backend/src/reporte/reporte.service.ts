import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reporte } from './entities/reporte.entity';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';
import { Cancha } from '../cancha/entities/cancha.entity';
import { Reserva } from '../reserva/entities/reserva.entity';

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

  async update(
    id: number,
    updateReporteDto: UpdateReporteDto,
  ): Promise<Reporte> {
    const reporte = await this.findOne(id);
    Object.assign(reporte, updateReporteDto);
    return this.reporteRepository.save(reporte);
  }

  async remove(id: number): Promise<{ message: string }> {
    const reporte = await this.findOne(id);
    await this.reporteRepository.remove(reporte);
    return { message: `Reporte con ID ${id} eliminado` };
  }

  async generarInformePorCancha(canchaId: number) {
    const cancha = await this.reporteRepository.manager.findOne(Cancha, {
      where: { id: canchaId },
    });
    if (!cancha) throw new NotFoundException('Cancha no encontrada');

    const reservas = await this.reporteRepository.manager.find(Reserva, {
      where: { cancha: { id: canchaId } },
    });

    const cantidadReservas = reservas.length;
    const totalGenerado = reservas.reduce((acc, reserva) => {
      const duracionHoras =
        (new Date(reserva.fecha_fin).getTime() -
          new Date(reserva.fecha_inicio).getTime()) /
        3600000;
      return acc + duracionHoras * cancha.precio_por_hora;
    }, 0);

    return {
      cancha: cancha.nombre,
      estado: cancha.estado,
      totalGenerado: Math.round(totalGenerado),
      cantidadReservas,
    };
  }
}
