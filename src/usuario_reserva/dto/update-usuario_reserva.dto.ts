import { PartialType } from '@nestjs/mapped-types';
import { CreateUsuarioReservaDto } from './create-usuario_reserva.dto';

export class UpdateUsuarioReservaDto extends PartialType(CreateUsuarioReservaDto) {}
