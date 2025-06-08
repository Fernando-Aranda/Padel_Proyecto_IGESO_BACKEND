import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsuarioModule } from '../usuario/usuario.module'; // Importamos el módulo de Usuario

@Module({
  imports: [UsuarioModule], // Importamos el módulo de Usuario para poder usar su servicio
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
