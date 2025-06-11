import { Test, TestingModule } from '@nestjs/testing';
import { EntregadorService } from './entregador.service';

describe('EntregadorService', () => {
  let service: EntregadorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EntregadorService],
    }).compile();

    service = module.get<EntregadorService>(EntregadorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
