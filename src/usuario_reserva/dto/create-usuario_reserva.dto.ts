import { IsInt, IsString, IsNotEmpty, Min } from 'class-validator';

export class CreateUsuarioReservaDto {
  @IsInt()
  id_reserva: number;

  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  rut: string;

  @IsInt()
  @Min(0)
  edad: number;
}
