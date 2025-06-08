import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioReservaController } from './usuario_reserva.controller';
import { UsuarioReservaService } from './usuario_reserva.service';

describe('UsuarioReservaController', () => {
  let controller: UsuarioReservaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuarioReservaController],
      providers: [UsuarioReservaService],
    }).compile();

    controller = module.get<UsuarioReservaController>(UsuarioReservaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
