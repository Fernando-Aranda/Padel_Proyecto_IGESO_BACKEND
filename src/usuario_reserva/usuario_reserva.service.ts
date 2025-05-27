import { Injectable } from '@nestjs/common';
import { CreateUsuarioReservaDto } from './dto/create-usuario_reserva.dto';
import { UpdateUsuarioReservaDto } from './dto/update-usuario_reserva.dto';

@Injectable()
export class UsuarioReservaService {
  create(createUsuarioReservaDto: CreateUsuarioReservaDto) {
    return 'This action adds a new usuarioReserva';
  }

  findAll() {
    return `This action returns all usuarioReserva`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuarioReserva`;
  }

  update(id: number, updateUsuarioReservaDto: UpdateUsuarioReservaDto) {
    return `This action updates a #${id} usuarioReserva`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuarioReserva`;
  }
}
