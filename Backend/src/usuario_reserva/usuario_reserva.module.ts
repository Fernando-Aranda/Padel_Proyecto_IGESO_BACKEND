import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioReservaService } from './usuario_reserva.service';
import { UsuarioReservaController } from './usuario_reserva.controller';
import { UsuarioReserva } from './entities/usuario_reserva.entity';
import { Reserva } from '../reserva/entities/reserva.entity';
import { Usuario } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioReserva, Reserva, Usuario])],
  controllers: [UsuarioReservaController],
  providers: [UsuarioReservaService],
})
export class UsuarioReservaModule {}
