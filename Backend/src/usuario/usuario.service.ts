import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from './entities/usuario.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const { password, ...rest } = createUsuarioDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const usuario = this.usuarioRepository.create({
      ...rest,
      password: hashedPassword,
    });
    return this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOneBy({ id });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }

    async agregarSaldo(id: number, monto: number): Promise<Usuario | undefined> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) return undefined;
    usuario.monto += Number(monto);
    await this.usuarioRepository.save(usuario);
    return usuario;
  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    if (updateUsuarioDto.password) {
      updateUsuarioDto.password = await bcrypt.hash(updateUsuarioDto.password, 10);
    }
    const updated = Object.assign(usuario, updateUsuarioDto);
    return this.usuarioRepository.save(updated);
  }

  async remove(id: number): Promise<{ message: string }> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
    return { message: `Usuario con ID ${id} eliminado` };
  }

  async findByCorreo(correo: string): Promise<Usuario | null> {
  return this.usuarioRepository.findOne({ where: { correo } });
}

}
