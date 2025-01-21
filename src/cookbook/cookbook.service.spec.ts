import { Test, TestingModule } from '@nestjs/testing';
import { CookbookService } from './cookbook.service';
import { PrismaService } from '../prisma/prisma.service';
import { Cookbook } from '../@generated/cookbook/cookbook.model';
import { BadRequestException } from '@nestjs/common';
import { CookbookUpdateManyMutationInput } from '../@generated/cookbook/cookbook-update-many-mutation.input';
import { CookbookCreateInput } from '../@generated/cookbook/cookbook-create.input';
import { Role } from '../@generated/prisma/role.enum';
import { Decimal } from '@prisma/client/runtime/library';


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
              findMany: jest.fn(),
            },
            user: {
              create: jest.fn(), // Mock the Prisma client's user.create method
              findUnique: jest.fn(),
            },
            recipe: {
              update: jest.fn(),
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
      const mockCookbook: Cookbook = {
        id: 1,
        name: 'Test Cookbook',
        description: null,
        isPublic: false,
        isMainCookbook: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 123,
        rating: null,
        ratingsCount: 0,
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
        image: null,
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
      const mockCookbook: Cookbook = {
        id: 1,
        name: 'Test Cookbook',
        description: null,
        isPublic: false,
        isMainCookbook: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 123,
        rating: null,
        ratingsCount: 0,
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
      const mockCookbook: Cookbook = {
        id: 1,
        name: 'Test Cookbook',
        description: null,
        isPublic: false,
        isMainCookbook: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 123,
        rating: null,
        ratingsCount: 0,
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
        ratingsCount: 0,
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

  describe('getRecipesByCookbookId', () => {
    it('should return recipes for a given cookbookId', async () => {
      const mockCookbook: Cookbook = {
        id: 1,
        name: 'Test Cookbook',
        description: null,
        isPublic: false,
        isMainCookbook: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 123,
        rating: null,
        ratingsCount: 0,
        recipes: [
          {
            id: 1,
            name: 'Recipe 1',
            description: 'Description of Recipe 1',
            directions: 'Step-by-step directions for Recipe 1',
            ingredients: ['ingredient1', 'ingredient2'],
            prepTime: 30,
            cookTime: 60,
            isPublic: true,
            userId: 123,
            rating: null,
            ratingsCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            image: null,
            user: { 
              id: 123,
              name: 'user1',
              email: 'testUser@mail.com',
              username: 'testUser',
              password: 'securePassword123',
              mainCookbookId: null, // No main cookbook assigned
              role: Role.USER, // Default role
              createdAt: new Date(), // Mocked creation date
              updatedAt: new Date(), // Mocked update date 
              image: null,
            },
            cookbook: [],
            communities: [],
            _count: { communities: 0, cookbook: 0 },
          },
          {
            id: 2,
            name: 'Recipe 2',
            description: 'Description of Recipe 2',
            directions: 'Step-by-step directions for Recipe 2',
            ingredients: ['ingredient1', 'ingredient2'],
            prepTime: 20,
            cookTime: 40,
            isPublic: true,
            userId: 123,
            rating: null,
            ratingsCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            image: null,
            user: { 
              id: 123,
              name: 'user1',
              email: 'testUser@mail.com',
              username: 'testUser',
              password: 'securePassword123',
              mainCookbookId: null, // No main cookbook assigned
              role: Role.USER, // Default role
              createdAt: new Date(), // Mocked creation date
              updatedAt: new Date(), // Mocked update date 
              image: null,
            },
            cookbook: [],
            communities: [],
            _count: { communities: 0, cookbook: 0 },
          },
        ],
      };
      jest.spyOn(prisma.cookbook, 'findUnique').mockResolvedValue(mockCookbook);
      const result = await service.getRecipesByCookbookId(1);
      expect(prisma.cookbook.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { 
          recipes: {
              include: {
                  cookbook: true,
                  communities: true,
              },
          } 
      },
      });
      expect(result).toEqual(mockCookbook.recipes);
    });

    it('should throw an error if cookbook ID is missing', async () => {
      await expect(service.getRecipesByCookbookId(null)).rejects.toThrow('Cookbook ID is required');
    });

    it('should throw an error if the cookbook does not exist', async () => {
      jest.spyOn(prisma.cookbook, 'findUnique').mockResolvedValue(null); // Mock no cookbook found
      await expect(service.getRecipesByCookbookId(1)).rejects.toThrow(
        'Cookbook with ID 1 does not exist'
      );
    });

    it('should throw an error if service fails', async () => {
      jest.spyOn(prisma.cookbook, 'findUnique').mockRejectedValue(new Error('Service Error'));
      await expect(service.getRecipesByCookbookId(1)).rejects.toThrow('Service Error');
    });
  });

  describe('getCookbooksByIds', () => {
    it('should return cookbooks for a given array of ids', async () => {
      const mockCookbooks: Cookbook[] = [
        {
          id: 1,
          name: 'Cookbook 1',
          description: 'Description for Cookbook 1',
          isPublic: false,
          isMainCookbook: false,
          userId: 123,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: null,
          ratingsCount: 0,
        },
        {
          id: 2,
          name: 'Cookbook 2',
          description: 'Description for Cookbook 2',
          isPublic: false,
          isMainCookbook: false,
          userId: 124,
          createdAt: new Date(),
          updatedAt: new Date(),
          rating: null,
          ratingsCount: 0,
        },
      ];
      jest.spyOn(prisma.cookbook, 'findMany').mockResolvedValue(mockCookbooks);
      const result = await service.getCookbooksByIds([1, 2]);
      expect(prisma.cookbook.findMany).toHaveBeenCalledWith({
        where: { id: { in: [1, 2] } },
      });
      expect(result).toEqual(mockCookbooks);
    });

    it('should throw an error if no IDs are provided', async () => {
      await expect(service.getCookbooksByIds([])).rejects.toThrow(
        'Array of cookbook IDs must not be empty'
      );
    });

    it('should throw an error if service fails', async () => {
      jest.spyOn(prisma.cookbook, 'findMany').mockRejectedValue(new Error('Service Error'));
      await expect(service.getCookbooksByIds([1, 2])).rejects.toThrow('Service Error');
    });
  });

  describe('deleteRecipeFromCookbook', () => {
    it('should remove a recipe from the cookbook with valid input', async () => {
      const mockCookbook: Cookbook = {
        id: 1,
        name: 'Cookbook 1',
        description: 'A test cookbook',
        isPublic: true,
        isMainCookbook: false,
        userId: 123,
        rating: null,
        ratingsCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        recipes: [
          {
            id: 1,
            name: 'Mock Recipe',
            description: 'A mock recipe description',
            directions: 'Mock directions',
            ingredients: ['Ingredient1', 'Ingredient2'],
            prepTime: 10,
            cookTime: 20,
            isPublic: false,
            userId: 2,
            rating: null,
            ratingsCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: null,
            cookbook: null,
            communities: null,
            _count: null,
            image: null,
          }, 
          {
            id: 2,
            name: 'Mock Recipe2',
            description: 'A mock recipe description',
            directions: 'Mock directions',
            ingredients: ['Ingredient1', 'Ingredient2'],
            prepTime: 10,
            cookTime: 20,
            isPublic: false,
            userId: 2,
            rating: null,
            ratingsCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: null,
            cookbook: null,
            communities: null,
            _count: null,
            image: null,
          }
        ]
      };
      const mockUpdatedCookbook: Cookbook = {
        ...mockCookbook,
        recipes: [
          {
            id: 2,
            name: 'Mock Recipe2',
            description: 'A mock recipe description',
            directions: 'Mock directions',
            ingredients: ['Ingredient1', 'Ingredient2'],
            prepTime: 10,
            cookTime: 20,
            isPublic: false,
            userId: 2,
            rating: null,
            ratingsCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            user: null,
            cookbook: null,
            communities: null,
            _count: null,
            image: null,
          }
        ] // Recipe 1 removed
      };
      const cookbookId = 1;
      const recipeId = 2;
      jest.spyOn(prisma.cookbook, 'findUnique').mockResolvedValue(mockCookbook); // Mock finding the cookbook
      jest.spyOn(prisma.cookbook, 'update').mockResolvedValue(mockUpdatedCookbook); // Mock updating the cookbook
      jest.spyOn(prisma.recipe, 'update').mockResolvedValue(mockCookbook.recipes[1]); // Mock updating the recipe
      const result = await service.deleteRecipeFromCookbook(cookbookId, recipeId);
      expect(prisma.cookbook.findUnique).toHaveBeenCalledWith({
        where: { id: cookbookId },
      });
      expect(prisma.cookbook.update).toHaveBeenCalledWith({
        where: { id: cookbookId },
        data: {
          recipes: { disconnect: { id: recipeId } }
        },
        include: { recipes: true },
      });
      expect(prisma.recipe.update).toHaveBeenCalledWith({
        where: { id: recipeId },
        data: {
          cookbook: { disconnect: { id: cookbookId } }
        },
      });
      expect(result).toEqual(mockUpdatedCookbook);
    });
  
    it('should throw an error if cookbook ID is missing', async () => {
      const cookbookId = null;
      const recipeId = 2;
      await expect(service.deleteRecipeFromCookbook(cookbookId, recipeId)).rejects.toThrow('Cookbook ID is required');
    });
  
    it('should throw an error if cookbook does not exist', async () => {
      const cookbookId = 1;
      const recipeId = 2;
      jest.spyOn(prisma.cookbook, 'findUnique').mockResolvedValue(null); // Mock no cookbook found 
      await expect(service.deleteRecipeFromCookbook(cookbookId, recipeId)).rejects.toThrow('Cookbook with ID 1 does not exist');
    });
  
    it('should throw an error if service fails', async () => {
      const cookbookId = 1;
      const recipeId = 2;
      jest.spyOn(prisma.cookbook, 'findUnique').mockRejectedValue(new Error('Service Error'));
      await expect(service.deleteRecipeFromCookbook(cookbookId, recipeId)).rejects.toThrow('Service Error');
    });
  });

  describe('searchCookbooks', () => {
    it('should return cookbooks that match the query', async () => {
      const mockCookbook: Cookbook[] = [
        {
          id: 1,
          name: 'Cookbook1',
          description: 'description1',
          isPublic: true,
          isMainCookbook: false,
          userId: 123,
          rating: null,
          ratingsCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      jest.spyOn(prisma.cookbook, 'findMany').mockResolvedValue(mockCookbook);
      const result = await service.searchCookbook('description');
      expect(prisma.cookbook.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { name: { contains: 'description', mode: 'insensitive' } },
            { description: { contains: 'description', mode: 'insensitive' } },
          ],
        },
      });
      expect(result).toEqual(mockCookbook);
    });
    
    it('should throw a BadRequestException if query is empty', async () => {
      await expect(service.searchCookbook('')).rejects.toThrow(BadRequestException);
    });
    
    it('should throw an error if Prisma throws an exception', async () => {
      jest.spyOn(prisma.cookbook, 'findMany').mockRejectedValue(new Error('Database error'));
      await expect(service.searchCookbook('description')).rejects.toThrow('Database error');
      expect(prisma.cookbook.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { name: { contains: 'description', mode: 'insensitive' } },
            { description: { contains: 'description', mode: 'insensitive' } },
          ],
        },
      });
    });
  });

  describe('updateCookbookRating', () => {
    it('should throw BadRequestException if cookbookId is not provided', async () => {
      await expect(service.updateCookbookRating(null, 3)).rejects.toThrow(
        'Cookbook ID is required to update cookbook rating',
      );
    });
    
    it('should throw BadRequestException if rating is out of range', async () => {
      await expect(service.updateCookbookRating(1, -1)).rejects.toThrow(
        'Rating must be between 0 and 5',
      );
      await expect(service.updateCookbookRating(1, 6)).rejects.toThrow(
        'Rating must be between 0 and 5',
      );
    });
    
    it('should throw BadRequestException if the cookbook does not exist', async () => {
      const cookbookId = 1;
      const rating = 4;
      jest.spyOn(prisma.cookbook, 'findUnique').mockResolvedValue(null);
      await expect(service.updateCookbookRating(cookbookId, rating)).rejects.toThrow(
        'Cookbook does not exist',
      );
    });
    
    it('should update the cookbook rating successfully when valid data is provided', async () => {
      const cookbookId = 1;
      const rating = 4;
      const mockExistingCookbook: Cookbook = {
        id: 1,
        name: 'Cookbook1',
        description: 'description1',
        isPublic: true,
        isMainCookbook: false,
        userId: 123,
        rating: new Decimal(3),
        ratingsCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const updatedCookbook: Cookbook = {
        id: 1,
        name: 'Cookbook1',
        description: 'description1',
        isPublic: true,
        isMainCookbook: false,
        userId: 123,
        rating: new Decimal(3.5),
        ratingsCount: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.cookbook, 'findUnique').mockResolvedValue(mockExistingCookbook);
      jest.spyOn(prisma.cookbook, 'update').mockResolvedValue(updatedCookbook);
      const result = await service.updateCookbookRating(cookbookId, rating);
      expect(prisma.cookbook.findUnique).toHaveBeenCalledWith({
        where: { id: cookbookId },
        select: { rating: true, ratingsCount: true },
      });
      expect(prisma.cookbook.update).toHaveBeenCalledWith({
        where: { id: cookbookId },
        data: {
          rating: new Decimal(3.5),
          ratingsCount: 2,
          updatedAt: expect.any(Date),
        },
      });
      expect(result).toEqual(updatedCookbook);
    });
    
    it('should handle errors thrown during the process', async () => {
      const cookbookId = 1;
      const rating = 4;
      jest.spyOn(prisma.cookbook, 'findUnique').mockRejectedValue(new Error('Database Error'));
      await expect(service.updateCookbookRating(cookbookId, rating)).rejects.toThrow('Database Error');
    });
  });
});
