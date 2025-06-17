import { IsInt, Min } from 'class-validator';

export class CreateUsuarioReservaDto {
  @IsInt()
  id_usuario: number;

  @IsInt()
  id_reserva: number;
}
