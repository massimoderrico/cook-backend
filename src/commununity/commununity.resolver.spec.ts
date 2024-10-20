import { Test, TestingModule } from '@nestjs/testing';
import { CommununityResolver } from './commununity.resolver';

describe('CommununityResolver', () => {
  let resolver: CommununityResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CommununityResolver],
    }).compile();

    resolver = module.get<CommununityResolver>(CommununityResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
