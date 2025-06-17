import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notificacion } from './entities/notificacion.entity';
import { Repository } from 'typeorm';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Notificacion)
    private notificacionRepository: Repository<Notificacion>,

    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createNotificacionDto: CreateNotificacionDto): Promise<Notificacion> {
    const usuario = await this.usuarioRepository.findOneBy({ id: createNotificacionDto.id_usuario });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${createNotificacionDto.id_usuario} no encontrado`);
    }

    const notificacion = this.notificacionRepository.create({
      usuario,
      mensaje: createNotificacionDto.mensaje,
      fecha_envio: new Date(createNotificacionDto.fecha_envio),
      tipo: createNotificacionDto.tipo,
      estado: createNotificacionDto.estado,
    });

    return this.notificacionRepository.save(notificacion);
  }

  findAll(): Promise<Notificacion[]> {
    return this.notificacionRepository.find({ relations: ['usuario'] });
  }

  async findOne(id: number): Promise<Notificacion> {
    const notificacion = await this.notificacionRepository.findOne({
      where: { id },
      relations: ['usuario'],
    });
    if (!notificacion) {
      throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    }
    return notificacion;
  }

  async update(id: number, updateNotificacionDto: UpdateNotificacionDto): Promise<Notificacion> {
    const notificacion = await this.findOne(id);

    if (updateNotificacionDto.id_usuario) {
      const usuario = await this.usuarioRepository.findOneBy({ id: updateNotificacionDto.id_usuario });
      if (!usuario) {
        throw new NotFoundException(`Usuario con ID ${updateNotificacionDto.id_usuario} no encontrado`);
      }
      notificacion.usuario = usuario;
    }

    if (updateNotificacionDto.fecha_envio) {
      updateNotificacionDto.fecha_envio = new Date(updateNotificacionDto.fecha_envio);
    }

    Object.assign(notificacion, updateNotificacionDto);

    return this.notificacionRepository.save(notificacion);
  }

  async remove(id: number): Promise<{ message: string }> {
    const notificacion = await this.findOne(id);
    await this.notificacionRepository.remove(notificacion);
    return { message: `Notificación con ID ${id} eliminada` };
  }
}
