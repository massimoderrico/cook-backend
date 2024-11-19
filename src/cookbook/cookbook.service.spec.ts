import { Test, TestingModule } from '@nestjs/testing';
import { CookbookService } from './cookbook.service';
import { PrismaService } from '../prisma/prisma.service';
import { CookbookCreateInput } from '../@generated/cookbook/cookbook-create.input';


describe('CookbookService', () => {
  let service: CookbookService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CookbookService,
        {
          provide: PrismaService,
          useValue: {
            cookbook: {
              create: jest.fn(), // Mock the Prisma client's create method
            },
          },
        },
      ],
    }).compile();

    service = module.get<CookbookService>(CookbookService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createCookbook', () => {
    it('should create a cookbook with valid input', async () => {
      const mockCookbook = {
        id: 1,
        name: 'Test Cookbook',
        description: null,
        isPublic: true,
        isMainCookbook: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 123,
        rating: null,
      };
      const input: CookbookCreateInput = {
        name: 'Test Cookbook',
        user: { connect: { id: 1 } }, // Minimal user input
      };

      jest.spyOn(prisma.cookbook, 'create').mockResolvedValue(mockCookbook);

      const result = await service.createCookbook(input);
      expect(prisma.cookbook.create).toHaveBeenCalledWith({ data: expect.any(Object) });
      expect(result).toEqual(mockCookbook);
    });

    it('should throw an error if user input is missing', async () => {
      const input = { name: 'Test Cookbook' } as any;

      await expect(service.createCookbook(input)).rejects.toThrow('User input is required for creating a cookbook.');
    });
  });
});
