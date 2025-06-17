import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { Reserva } from './entities/reserva.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Cancha } from '../cancha/entities/cancha.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Usuario, Cancha])],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
