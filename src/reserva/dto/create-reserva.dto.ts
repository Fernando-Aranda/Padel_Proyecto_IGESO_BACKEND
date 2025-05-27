import { IsInt, IsDateString, IsString, IsNumber, Min } from 'class-validator';

export class CreateReservaDto {
  @IsInt()
  id_usuario: number;

  @IsInt()
  id_cancha: number;

  @IsDateString()
  fecha_inicio: string;

  @IsDateString()
  fecha_fin: string;

  @IsString()
  estado: string;

  @IsNumber()
  @Min(0)
  monto_total: number;
}
