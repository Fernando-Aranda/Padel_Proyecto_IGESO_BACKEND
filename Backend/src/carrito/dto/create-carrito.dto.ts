import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCarritoDto {
  @IsNotEmpty()
  @IsNumber()
  id_usuario: number;
}
