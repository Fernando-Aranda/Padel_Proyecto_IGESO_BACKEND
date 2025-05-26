import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  Min,
} from 'class-validator';

export class CreateUsuarioDto {
  
  @IsString()
  @IsNotEmpty()
  nombre: string;
  
  @IsString()
  @IsNotEmpty()
  apellido: string;

  @IsString()
  @IsNotEmpty()
  rut: string;

  @IsEmail()
  @IsNotEmpty()
  correo: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsString()
  @IsNotEmpty()
  rol: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  monto?: number;

}
