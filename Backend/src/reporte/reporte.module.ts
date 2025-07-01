import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReporteService } from './reporte.service';
import { ReporteController } from './reporte.controller';
import { Reporte } from './entities/reporte.entity';
import { Cancha } from '../cancha/entities/cancha.entity';
import { Reserva } from '../reserva/entities/reserva.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reporte, Cancha, Reserva])], // <-- IMPORTANTE
  controllers: [ReporteController],
  providers: [ReporteService],
})
export class ReporteModule {}
