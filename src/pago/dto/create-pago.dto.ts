import { IsInt, IsNumber, IsString, IsNotEmpty, IsDateString, Min } from 'class-validator';

export class CreatePagoDto {
  @IsInt()
  id_reserva: number;

  @IsNumber()
  @Min(0)
  monto: number;

  @IsDateString()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  medio_pago: string;

  @IsString()
  @IsNotEmpty()
  estado: string;
}
