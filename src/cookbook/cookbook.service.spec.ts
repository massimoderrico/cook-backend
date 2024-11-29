import { Test, TestingModule } from '@nestjs/testing';
import { CookbookService } from './cookbook.service';
import { PrismaService } from '../prisma/prisma.service';
import { Cookbook } from '../@generated/cookbook/cookbook.model';
import { CookbookUpdateManyMutationInput } from '../@generated/cookbook/cookbook-update-many-mutation.input';
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
              update: jest.fn(),
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

  it('service and prisma should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
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
  
  describe('editCookbook', () => {
    it('should edit a cookbook with valid input', async () => {
      const mockCookbook: Cookbook = {
        id: 1,
        name: 'Updated Cookbook',
        description: 'Updated description',
        isPublic: true,
        isMainCookbook: false,
        userId: 123,
        rating: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const input: CookbookUpdateManyMutationInput = {
        name: { "set": "Updated Cookbook Name" },
        description: { "set": "new description" },
      };
      jest.spyOn(prisma.cookbook, 'findUnique').mockResolvedValue(mockCookbook); // Mock finding the cookbook
      jest.spyOn(prisma.cookbook, 'update').mockResolvedValue(mockCookbook); // Mock updating the cookbook
      const result = await service.editCookbook(1, input);
      expect(prisma.cookbook.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prisma.cookbook.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: input,
      });
      expect(result).toEqual(mockCookbook);
    });

    it('should throw an error if cookbook ID is missing', async () => {
      const input: CookbookUpdateManyMutationInput = { name: { "set": "Updated Cookbook Name" }, } as any;
      await expect(service.editCookbook(null, input)).rejects.toThrow('Cookbook ID is required');
    });

    it('should throw an error if the cookbook does not exist', async () => {
      const input: CookbookUpdateManyMutationInput = { name: { "set": "Updated Cookbook Name" }, };
      jest.spyOn(prisma.cookbook, 'findUnique').mockResolvedValue(null); // Mock no cookbook found
      await expect(service.editCookbook(1, input)).rejects.toThrow(
        `Cookbook with ID 1 does not exist`
      );
    });

    it('should throw an error if service fails', async () => {
      const input: CookbookUpdateManyMutationInput = { name: { "set": "Updated Cookbook Name" }, };
      jest.spyOn(prisma.cookbook, 'findUnique').mockRejectedValue(new Error('Service Error'));
      await expect(service.editCookbook(1, input)).rejects.toThrow('Service Error');
    });
  });
});
