import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoService } from './carrito.service';
import { CarritoController } from './carrito.controller';
import { Carrito } from './entities/carrito.entity';
import { CarritoItem } from '../carrito-item/entities/carrito-item.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carrito, CarritoItem, Usuario])],
  controllers: [CarritoController],
  providers: [CarritoService],
})
export class CarritoModule {}
