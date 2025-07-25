import { IsOptional, IsBoolean } from 'class-validator';

export class UpdateCarritoDto {
  @IsOptional()
  @IsBoolean()
  comprado?: boolean;
}
