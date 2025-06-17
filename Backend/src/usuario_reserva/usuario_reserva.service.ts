import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioReserva } from './entities/usuario_reserva.entity';
import { CreateUsuarioReservaDto } from './dto/create-usuario_reserva.dto';
import { UpdateUsuarioReservaDto } from './dto/update-usuario_reserva.dto';

@Injectable()
export class UsuarioReservaService {
  constructor(
    @InjectRepository(UsuarioReserva)
    private usuarioReservaRepository: Repository<UsuarioReserva>,
  ) {}

  async create(createDto: CreateUsuarioReservaDto): Promise<UsuarioReserva> {
    const usuarioReserva = this.usuarioReservaRepository.create({
      usuario: { id: createDto.id_usuario } as any,
      reserva: { id: createDto.id_reserva } as any,
    });

    return this.usuarioReservaRepository.save(usuarioReserva);
  }

  findAll(): Promise<UsuarioReserva[]> {
    return this.usuarioReservaRepository.find({
      relations: ['usuario', 'reserva'],
    });
  }

  async findOne(id: number): Promise<UsuarioReserva> {
    const entity = await this.usuarioReservaRepository.findOne({
      where: { id },
      relations: ['usuario', 'reserva'],
    });

    if (!entity) {
      throw new NotFoundException(`UsuarioReserva con ID ${id} no encontrado`);
    }

    return entity;
  }

  async update(id: number, updateDto: UpdateUsuarioReservaDto): Promise<UsuarioReserva> {
    const entity = await this.findOne(id);
    Object.assign(entity, updateDto);
    return this.usuarioReservaRepository.save(entity);
  }

  async remove(id: number): Promise<{ message: string }> {
    const entity = await this.findOne(id);
    await this.usuarioReservaRepository.remove(entity);
    return { message: `UsuarioReserva con ID ${id} eliminado` };
  }
}
