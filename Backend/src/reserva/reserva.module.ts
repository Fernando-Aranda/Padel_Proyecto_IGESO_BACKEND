import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaService } from './reserva.service';
import { ReservaController } from './reserva.controller';
import { Reserva } from './entities/reserva.entity';
import { Usuario } from '../usuario/entities/usuario.entity';
import { Cancha } from '../cancha/entities/cancha.entity';
import { EmailService } from 'src/email/email.service';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva, Usuario, Cancha])],
  controllers: [ReservaController],
  providers: [ReservaService, EmailService],
})
export class ReservaModule {}
