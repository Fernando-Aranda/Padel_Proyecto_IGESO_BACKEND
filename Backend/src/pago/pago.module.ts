import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pago } from './entities/pago.entity';
import { Reserva } from '../reserva/entities/reserva.entity';
import { PagoService } from './pago.service';
import { PagoController } from './pago.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Pago, Reserva])],
  controllers: [PagoController],
  providers: [PagoService],
})
export class PagoModule {}
