import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioReservaService } from './usuario_reserva.service';
import { CreateUsuarioReservaDto } from './dto/create-usuario_reserva.dto';
import { UpdateUsuarioReservaDto } from './dto/update-usuario_reserva.dto';

@Controller('usuario-reserva')
export class UsuarioReservaController {
  constructor(private readonly usuarioReservaService: UsuarioReservaService) {}

  @Post()
  create(@Body() createUsuarioReservaDto: CreateUsuarioReservaDto) {
    return this.usuarioReservaService.create(createUsuarioReservaDto);
  }

  @Get()
  findAll() {
    return this.usuarioReservaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuarioReservaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUsuarioReservaDto: UpdateUsuarioReservaDto) {
    return this.usuarioReservaService.update(+id, updateUsuarioReservaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usuarioReservaService.remove(+id);
  }
}
