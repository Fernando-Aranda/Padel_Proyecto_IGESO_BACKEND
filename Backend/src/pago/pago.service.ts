import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Repository } from 'typeorm';
import { CreatePagoDto } from './dto/create-pago.dto';
import { UpdatePagoDto } from './dto/update-pago.dto';
import { Reserva } from '../reserva/entities/reserva.entity';

@Injectable()
export class PagoService {
  constructor(
    @InjectRepository(Pago)
    private pagoRepository: Repository<Pago>,

    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
  ) {}

  async create(createPagoDto: CreatePagoDto): Promise<Pago> {
    const reserva = await this.reservaRepository.findOneBy({ id: createPagoDto.id_reserva });
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${createPagoDto.id_reserva} no encontrada`);
    }

    const pago = this.pagoRepository.create({
      reserva,
      monto: createPagoDto.monto,
      fecha: new Date(createPagoDto.fecha),
      medio_pago: createPagoDto.medio_pago,
      estado: createPagoDto.estado,
    });

    return this.pagoRepository.save(pago);
  }

  findAll(): Promise<Pago[]> {
    return this.pagoRepository.find({ relations: ['reserva'] });
  }

  async findOne(id: number): Promise<Pago> {
    const pago = await this.pagoRepository.findOne({
      where: { id },
      relations: ['reserva'],
    });
    if (!pago) {
      throw new NotFoundException(`Pago con ID ${id} no encontrado`);
    }
    return pago;
  }

  async update(id: number, updatePagoDto: UpdatePagoDto): Promise<Pago> {
    const pago = await this.findOne(id);

    if (updatePagoDto.id_reserva) {
      const reserva = await this.reservaRepository.findOneBy({ id: updatePagoDto.id_reserva });
      if (!reserva) {
        throw new NotFoundException(`Reserva con ID ${updatePagoDto.id_reserva} no encontrada`);
      }
      pago.reserva = reserva;
    }

    if (updatePagoDto.fecha) {
      updatePagoDto.fecha = new Date(updatePagoDto.fecha);
    }

    Object.assign(pago, updatePagoDto);

    return this.pagoRepository.save(pago);
  }

  async remove(id: number): Promise<{ message: string }> {
    const pago = await this.findOne(id);
    await this.pagoRepository.remove(pago);
    return { message: `Pago con ID ${id} eliminado` };
  }
}
