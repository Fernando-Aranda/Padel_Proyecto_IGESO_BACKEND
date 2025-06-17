import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reserva } from './entities/reserva.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Cancha } from '../cancha/entities/cancha.entity';
import { Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,

    @InjectRepository(Cancha)
    private canchaRepository: Repository<Cancha>,
  ) {}

  async create(createReservaDto: CreateReservaDto): Promise<Reserva> {
    // Buscar usuario relacionado
    const usuario = await this.usuarioRepository.findOneBy({ id: createReservaDto.id_usuario });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${createReservaDto.id_usuario} no encontrado`);
    }

    // Buscar cancha relacionada
    const cancha = await this.canchaRepository.findOneBy({ id: createReservaDto.id_cancha });
    if (!cancha) {
      throw new NotFoundException(`Cancha con ID ${createReservaDto.id_cancha} no encontrada`);
    }

    // Crear la reserva asignando las entidades relacionadas
    const reserva = this.reservaRepository.create({
      fecha_inicio: new Date(createReservaDto.fecha_inicio),
      fecha_fin: new Date(createReservaDto.fecha_fin),
      estado: createReservaDto.estado,
      monto_total: createReservaDto.monto_total,
      usuario,
      cancha,
    });

    return this.reservaRepository.save(reserva);
  }

  findAll(): Promise<Reserva[]> {
    return this.reservaRepository.find({
      relations: ['usuario', 'cancha'], // para cargar relaciones si quieres
    });
  }

  async findOne(id: number): Promise<Reserva> {
    const reserva = await this.reservaRepository.findOne({
      where: { id },
      relations: ['usuario', 'cancha'], // para cargar relaciones si quieres
    });
    if (!reserva) {
      throw new NotFoundException(`Reserva con ID ${id} no encontrada`);
    }
    return reserva;
  }

  async update(id: number, updateReservaDto: UpdateReservaDto): Promise<Reserva> {
    const reserva = await this.findOne(id);
    Object.assign(reserva, updateReservaDto);
    return this.reservaRepository.save(reserva);
  }

  async remove(id: number): Promise<{ message: string }> {
    const reserva = await this.findOne(id);
    await this.reservaRepository.remove(reserva);
    return { message: `Reserva con ID ${id} eliminada` };
  }
}
