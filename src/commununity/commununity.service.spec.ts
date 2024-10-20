import { Test, TestingModule } from '@nestjs/testing';
import { CommununityService } from './commununity.service';

describe('CommununityService', () => {
  let service: CommununityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommununityService],
    }).compile();

    service = module.get<CommununityService>(CommununityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
