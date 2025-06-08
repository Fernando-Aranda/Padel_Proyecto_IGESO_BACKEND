import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsuarioService } from '../usuario/usuario.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usuarioService: UsuarioService) {}

  async validateUser(correo: string, password: string) {
    const user = await this.usuarioService.findByCorreo(correo);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Contraseña válida
      const { password, ...result } = user;
      return result; // o genera un JWT aquí
    }
    throw new UnauthorizedException('Credenciales incorrectas');
  }
}