// carrito-item.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarritoItem } from './entities/carrito-item.entity';
import { CarritoItemService } from './carrito-item.service';
import { CarritoItemController } from './carrito-item.controller';
import { Carrito } from '../carrito/entities/carrito.entity';  // importa entidad Carrito
import { Cancha } from '../cancha/entities/cancha.entity';    // importa entidad Cancha

@Module({
  imports: [
    TypeOrmModule.forFeature([CarritoItem, Carrito, Cancha]), // agrega las entidades aquí
  ],
  controllers: [CarritoItemController],
  providers: [CarritoItemService],
  exports: [CarritoItemService], // si quieres usar este servicio en otros módulos
})
export class CarritoItemModule {}
