import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioReservaService } from './usuario_reserva.service';

describe('UsuarioReservaService', () => {
  let service: UsuarioReservaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuarioReservaService],
    }).compile();

    service = module.get<UsuarioReservaService>(UsuarioReservaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
