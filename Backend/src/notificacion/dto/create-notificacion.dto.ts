import { IsInt, IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class CreateNotificacionDto {
  @IsInt()
  id_usuario: number;

  @IsString()
  @IsNotEmpty()
  mensaje: string;

  @IsDateString()
  fecha_envio: string;

  @IsString()
  @IsNotEmpty()
  tipo: string;

  @IsString()
  @IsNotEmpty()
  estado: string;
}
