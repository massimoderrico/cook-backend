import { Test, TestingModule } from '@nestjs/testing';
import { CookbookService } from './cookbook.service';
import { PrismaService } from '../prisma/prisma.service';
import { CookbookCreateInput } from '../@generated/cookbook/cookbook-create.input';
import { Role } from '../@generated/prisma/role.enum';


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
              findUnique: jest.fn(),
            },
            user: {
              create: jest.fn(), // Mock the Prisma client's user.create method
              findUnique: jest.fn(),
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
        isPublic: false,
        isMainCookbook: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 123,
        rating: null,
      };
      
      const mockUser = {
        id: 123,
        name: 'user1',
        email: 'testUser@mail.com',
        username: 'testUser',
        password: 'securePassword123',
        mainCookbookId: null, // No main cookbook assigned
        role: Role.USER, // Default role
        createdAt: new Date(), // Mocked creation date
        updatedAt: new Date(), // Mocked update date
      };
      
      jest.spyOn(prisma.user, 'create').mockResolvedValue(mockUser);
      jest.spyOn(prisma.cookbook, 'create').mockResolvedValue(mockCookbook);
      
      const input: CookbookCreateInput = {
        name: 'Test Cookbook',
        user: { connect: { id: mockUser.id } }, // Minimal user input
      };
      const result = await service.createCookbook(input);

      expect(prisma.cookbook.create).toHaveBeenCalledWith({ data: expect.any(Object) });
      expect(result).toEqual(mockCookbook);
    });

    it('should throw an error if cookbook name input is missing', async () => {
      const input = { user: { connect: { id: 1 } } } as any;

      await expect(service.createCookbook(input)).rejects.toThrow('Cookbook name is required for creation');
    });
  });
});
