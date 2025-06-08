import { IsString, IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateCanchaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsNumber()
  @Min(1)
  capacidad_maxima: number;

  @IsNumber()
  @Min(0)
  precio_por_hora: number;

  @IsString()
  @IsNotEmpty()
  estado: string;
}
