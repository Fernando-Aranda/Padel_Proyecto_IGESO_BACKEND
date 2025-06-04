import { IsDateString } from 'class-validator';

export class CreateReporteDto {
  @IsDateString()
  fecha: string;
}
