import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarritoItem } from './entities/carrito-item.entity';
import { CreateCarritoItemDto } from './dto/create-carrito-item.dto';
import { UpdateCarritoItemDto } from './dto/update-carrito-item.dto';
import { Carrito } from '../carrito/entities/carrito.entity';
import { Cancha } from '../cancha/entities/cancha.entity';

@Injectable()
export class CarritoItemService {
  constructor(
    @InjectRepository(CarritoItem)
    private readonly carritoItemRepository: Repository<CarritoItem>,

    @InjectRepository(Carrito)
    private readonly carritoRepository: Repository<Carrito>,

    @InjectRepository(Cancha)
    private readonly canchaRepository: Repository<Cancha>,
  ) {}

  async create(dto: CreateCarritoItemDto): Promise<CarritoItem> {
    const carrito = await this.carritoRepository.findOne({ where: { id: dto.id_carrito } });
    if (!carrito) throw new NotFoundException('Carrito no encontrado');

    const cancha = await this.canchaRepository.findOne({ where: { id: dto.id_cancha } });
    if (!cancha) throw new NotFoundException('Cancha no encontrada');

    const item = this.carritoItemRepository.create({
      carrito,
      cancha,
      fecha_inicio: dto.fecha_inicio,
      fecha_fin: dto.fecha_fin,
      monto: dto.monto,
    });

    return this.carritoItemRepository.save(item);
  }

  async findAll(): Promise<CarritoItem[]> {
    return this.carritoItemRepository.find({ relations: ['carrito', 'cancha'] });
  }

  async findOne(id: number): Promise<CarritoItem> {
    const item = await this.carritoItemRepository.findOne({ where: { id }, relations: ['carrito', 'cancha'] });
    if (!item) throw new NotFoundException(`CarritoItem con id ${id} no encontrado`);
    return item;
  }

  async update(id: number, dto: UpdateCarritoItemDto): Promise<CarritoItem> {
    const item = await this.findOne(id);

    // Solo actualiza si vienen los datos en dto
    Object.assign(item, dto);
    return this.carritoItemRepository.save(item);
  }

  async remove(id: number): Promise<void> {
    const item = await this.findOne(id);
    await this.carritoItemRepository.remove(item);
  }
}
