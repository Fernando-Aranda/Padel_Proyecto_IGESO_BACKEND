import { Module } from '@nestjs/common';
import { UsuarioReservaService } from './usuario_reserva.service';
import { UsuarioReservaController } from './usuario_reserva.controller';

@Module({
  controllers: [UsuarioReservaController],
  providers: [UsuarioReservaService],
})
export class UsuarioReservaModule {}
