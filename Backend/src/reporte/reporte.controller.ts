import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ReporteService } from './reporte.service';
import { CreateReporteDto } from './dto/create-reporte.dto';
import { UpdateReporteDto } from './dto/update-reporte.dto';

@Controller('reporte')
export class ReporteController {
  constructor(private readonly reporteService: ReporteService) {}

  @Post()
  create(@Body() createReporteDto: CreateReporteDto) {
    return this.reporteService.create(createReporteDto);
  }

  @Get()
  findAll() {
    return this.reporteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reporteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReporteDto: UpdateReporteDto) {
    return this.reporteService.update(+id, updateReporteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reporteService.remove(+id);
  }

  @Get('cancha/:id')
  getReporteCancha(@Param('id', ParseIntPipe) id: number) {
    return this.reporteService.generarInformePorCancha(id);
  }
}
