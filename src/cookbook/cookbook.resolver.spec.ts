import { Test, TestingModule } from '@nestjs/testing';
import { CookbookResolver } from './cookbook.resolver';
import { CookbookService } from './cookbook.service';
import { Cookbook } from '../@generated/cookbook/cookbook.model';
import { Recipe } from '../@generated/recipe/recipe.model';
import { CookbookCreateInput } from '../@generated/cookbook/cookbook-create.input';
import { CookbookUpdateManyMutationInput } from '../@generated/cookbook/cookbook-update-many-mutation.input';
import { Role } from '../@generated/prisma/role.enum';

describe('CookbookResolver', () => {
  let resolver: CookbookResolver;
  let service: CookbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookbookResolver,
        {
          provide: CookbookService,
          useValue: {
            createCookbook: jest.fn(), // Mock the service methods
            deleteCookbook: jest.fn(),
            editCookbook: jest.fn(),
            getRecipesByCookbookId: jest.fn(),
            getCookbooksByIds: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<CookbookResolver>(CookbookResolver);
    service = module.get<CookbookService>(CookbookService);
  });

  it('resolver and service should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createCookbook', () => {
    it('should create a cookbook with minimal input (name and user)', async () => {
      // Arrange
      const mockCookbook: Cookbook = {
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
      jest.spyOn(service, 'createCookbook').mockResolvedValue(mockCookbook);
      // Act
      const result = await resolver.createCookbook(input);
      // Assert
      expect(service.createCookbook).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockCookbook);
    });

    it('should throw an error if service fails', async () => {
      const input = { name: 'Test Cookbook', user: {} } as any;
      jest.spyOn(service, 'createCookbook').mockRejectedValue(new Error('Service Error'));
      await expect(resolver.createCookbook(input)).rejects.toThrow('Failed to create cookbook: Service Error');
    });
  });

  describe('deleteCookbook', () => {
    it('should delete a cookbook with valid input', async () => {
      // Arrange
      const cookbookId = 1;
      const userId = 123;
      jest.spyOn(service, 'deleteCookbook').mockResolvedValue(true); // Mock service response
      // Act
      const result = await resolver.deleteCookbook(cookbookId, userId);
      // Assert
      expect(service.deleteCookbook).toHaveBeenCalledWith(cookbookId, userId);
      expect(result).toBe(true);
    });

    it('should throw an error if the service throws an error', async () => {
      // Arrange
      const cookbookId = 1;
      const userId = 123;
      jest.spyOn(service, 'deleteCookbook').mockRejectedValue(new Error('Service Error'));
      // Act & Assert
      await expect(resolver.deleteCookbook(cookbookId, userId)).rejects.toThrow(
        'Failed to delete cookbook: Service Error'
      );
    });
  });

  describe('editCookbook', () => {
    it('should edit a cookbook with valid input', async () => {
      // Arrange
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
      jest.spyOn(service, 'editCookbook').mockResolvedValue(mockCookbook);
      // Act
      const result = await resolver.editCookbook(1, input);
      // Assert
      expect(service.editCookbook).toHaveBeenCalledWith(1, input);
      expect(result).toEqual(mockCookbook);
    });

    it('should throw an error if service fails', async () => {
      const input = { name: 'Updated Cookbook' } as any;
      jest.spyOn(service, 'editCookbook').mockRejectedValue(new Error('Service Error'));

      await expect(resolver.editCookbook(1, input)).rejects.toThrow('Failed to edit cookbook: Service Error');
    });

    it('should throw an error if cookbook does not exist', async () => {
      const input: CookbookUpdateManyMutationInput = {
        name: { "set": "Updated Cookbook Name" },
        description: { "set": "new description" },
      };
      jest.spyOn(service, 'editCookbook').mockRejectedValue(new Error('Cookbook with ID 1 does not exist'));
      await expect(resolver.editCookbook(1, input)).rejects.toThrow('Failed to edit cookbook: Cookbook with ID 1 does not exist');
    });
  });

  describe('getRecipesByCookbookId', () => {
    it('should return recipes for a given cookbookId', async () => {
      // Arrange
      const mockRecipes: Recipe[] = [
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
          createdAt: new Date(),
          updatedAt: new Date(),
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
          createdAt: new Date(),
          updatedAt: new Date(),
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
          },
          cookbook: [],
          communities: [],
          _count: { communities: 0, cookbook: 0 },
        },
      ];
      jest.spyOn(service, 'getRecipesByCookbookId').mockResolvedValue(mockRecipes);
      // Act
      const result = await resolver.getRecipesByCookbookId(1);
      // Assert
      expect(service.getRecipesByCookbookId).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockRecipes);
    });

    it('should throw an error if service fails', async () => {
      jest.spyOn(service, 'getRecipesByCookbookId').mockRejectedValue(new Error('Service Error'));
      await expect(resolver.getRecipesByCookbookId(1)).rejects.toThrow('Failed to get recipes for cookbook ID 1: Service Error');
    });

    it('should throw an error if cookbook does not exist', async () => {
      jest.spyOn(service, 'getRecipesByCookbookId').mockRejectedValue(new Error('Cookbook with ID 1 does not exist'));
      await expect(resolver.getRecipesByCookbookId(1)).rejects.toThrow('Failed to get recipes for cookbook ID 1: Cookbook with ID 1 does not exist');
    });
  });

  describe('getCookbooksByIds', () => {
    it('should return cookbooks for a given array of ids', async () => {
      // Arrange: Mock data for cookbooks
      const mockCookbooks: Cookbook[] = [
        {
          id: 1,
          name: 'Cookbook1',
          description: 'description1',
          isPublic: true,
          isMainCookbook: false,
          userId: 123,
          rating: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'Cookbook2',
          description: 'description2',
          isPublic: true,
          isMainCookbook: false,
          userId: 123,
          rating: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];
      // Mock the service to return the mock cookbooks
      jest.spyOn(service, 'getCookbooksByIds').mockResolvedValue(mockCookbooks);
      // Act
      const result = await resolver.getCookbooksByIds([1, 2]);
      // Assert
      expect(service.getCookbooksByIds).toHaveBeenCalledWith([1, 2]);
      expect(result).toEqual(mockCookbooks);
    });

    it('should throw an error if service fails', async () => {
      jest.spyOn(service, 'getCookbooksByIds').mockRejectedValue(new Error('Service Error'));
      await expect(resolver.getCookbooksByIds([1, 2])).rejects.toThrow(
        'Failed to get cookbooks: Service Error'
      );
    });
  });
});
