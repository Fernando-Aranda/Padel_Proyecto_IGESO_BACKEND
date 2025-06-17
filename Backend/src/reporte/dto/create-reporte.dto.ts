import {
  IsDateString,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateReporteDto {
  @IsDateString()
  fecha: string;

  @IsString()
  @IsNotEmpty()
  descrip: string;
}
