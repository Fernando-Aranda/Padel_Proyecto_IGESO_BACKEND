import { IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class CreateCarritoItemDto {
  @IsNotEmpty()
  @IsNumber()
  id_carrito: number;

  @IsNotEmpty()
  @IsNumber()
  id_cancha: number;

  @IsNotEmpty()
  @IsDateString()
  fecha_inicio: Date;

  @IsNotEmpty()
  @IsDateString()
  fecha_fin: Date;

  @IsNotEmpty()
  @IsNumber()
  monto: number;
}
