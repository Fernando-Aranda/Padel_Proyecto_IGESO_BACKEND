import {
  IsDateString,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class CreateReporteDto {
  @IsDateString()
  fecha: Date;

  @IsString()
  @IsNotEmpty()
  descrip: string;
}
