import { Test, TestingModule } from '@nestjs/testing';
import { EntregadorController } from './entregador.controller';
import { EntregadorService } from './entregador.service';

describe('EntregadorController', () => {
  let controller: EntregadorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EntregadorController],
      providers: [EntregadorService],
    }).compile();

    controller = module.get<EntregadorController>(EntregadorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
