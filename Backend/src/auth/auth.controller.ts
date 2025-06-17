import { Controller, Post, Body, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { correo: string, password: string }) {
    return this.authService.validateUser(body.correo, body.password);
  }

  @Get('test')
  test() {
    return { message: 'Auth module funciona' };
  }
}