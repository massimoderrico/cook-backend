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
              delete: jest.fn(),
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

  describe('deleteCookbook', () => {
    it('should delete a cookbook with valid input', async () => {
      // Arrange
      const cookbookId = 1;
      const userId = 123;
  
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
  
      jest.spyOn(prisma.cookbook, 'findUnique').mockResolvedValue(mockCookbook);
      jest.spyOn(prisma.cookbook, 'delete').mockResolvedValue(mockCookbook);
  
      // Act
      const result = await service.deleteCookbook(cookbookId, userId);
  
      // Assert
      expect(prisma.cookbook.findUnique).toHaveBeenCalledWith({
        where: { id: cookbookId },
        select: { userId: true },
      });
      expect(prisma.cookbook.delete).toHaveBeenCalledWith({
        where: { id: cookbookId },
      });
      expect(result).toBe(true);
    });
  
    it('should throw an error if the cookbook does not exist', async () => {
      // Arrange
      const cookbookId = 1;
      const userId = 123;
  
      jest.spyOn(prisma.cookbook, 'findUnique').mockResolvedValue(null);
  
      // Act & Assert
      await expect(service.deleteCookbook(cookbookId, userId)).rejects.toThrow(
        `Cookbook with ID ${cookbookId} does not exist.`
      );
    });
  
    it('should throw an error if the user does not own the cookbook', async () => {
      // Arrange
      const cookbookId = 1;
      const userId = 123;
      const otherUserId = 456;
  
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
  
      jest.spyOn(prisma.cookbook, 'findUnique').mockResolvedValue(mockCookbook);
  
      // Act & Assert
      await expect(service.deleteCookbook(cookbookId, otherUserId)).rejects.toThrow(
        'User does not have permission to delete this cookbook.'
      );
    });
  
    it('should throw an error if cookbookId or userId is missing', async () => {
      await expect(service.deleteCookbook(null, 123)).rejects.toThrow(
        'Cookbook ID and User ID are required to delete a cookbook.'
      );
      await expect(service.deleteCookbook(1, null)).rejects.toThrow(
        'Cookbook ID and User ID are required to delete a cookbook.'
      );
    });
  });
  
});
