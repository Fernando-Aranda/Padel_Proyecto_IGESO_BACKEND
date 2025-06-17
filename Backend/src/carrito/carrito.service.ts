import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carrito } from './entities/carrito.entity';
import { CreateCarritoDto } from './dto/create-carrito.dto';
import { UpdateCarritoDto } from './dto/update-carrito.dto';
import { Usuario } from '../usuario/entities/usuario.entity';

@Injectable()
export class CarritoService {
  constructor(
    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>,
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createCarritoDto: CreateCarritoDto): Promise<Carrito> {
    const usuario = await this.usuarioRepository.findOneBy({ id: createCarritoDto.id_usuario });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }

    const carrito = this.carritoRepository.create({
      usuario,
      comprado: false,
    });
    return this.carritoRepository.save(carrito);
  }

  findAll(): Promise<Carrito[]> {
    return this.carritoRepository.find({ relations: ['usuario', 'items'] });
  }

  async findOne(id: number): Promise<Carrito> {
    const carrito = await this.carritoRepository.findOne({
      where: { id },
      relations: ['usuario', 'items'],
    });
    if (!carrito) {
      throw new NotFoundException(`Carrito con id ${id} no encontrado`);
    }
    return carrito;
  }

  async update(id: number, updateCarritoDto: UpdateCarritoDto): Promise<Carrito> {
    const carrito = await this.findOne(id);

    Object.assign(carrito, updateCarritoDto);
    return this.carritoRepository.save(carrito);
  }

  async remove(id: number): Promise<void> {
    const result = await this.carritoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Carrito con id ${id} no encontrado`);
    }
  }
}
