import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { PrismaService } from '../prisma/prisma.service';
import { Recipe } from '../@generated/recipe/recipe.model';
import { BadRequestException } from '@nestjs/common';
import { User } from '../@generated/user/user.model';
import { RecipeCreateInput } from 'src/@generated/recipe/recipe-create.input';
import { Cookbook } from '@prisma/client';
import { RecipeUpdateManyMutationInput } from 'src/@generated/recipe/recipe-update-many-mutation.input';
import { Decimal } from '@prisma/client/runtime/library';

describe('RecipeService', () => {
  let service: RecipeService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeService,
        {
          provide: PrismaService,
          useValue: {
            recipe: {
              findUnique: jest.fn(),
              create: jest.fn(),
              delete: jest.fn(),
              update: jest.fn(),
              findMany: jest.fn(),
            },
            user: {
              findUnique: jest.fn(), // Add this mock
            },
            cookbook: {
              findMany: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();
  
    service = module.get<RecipeService>(RecipeService);
    prisma = module.get<PrismaService>(PrismaService);
  });
  

  it('service and prisma should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('createRecipe', () => {
    it('should throw BadRequestException if recipe name is missing', async () => {
      const noNameRecipe: RecipeCreateInput = {
        user: { connect: { id: 1 } },
      } as RecipeCreateInput;
  
      await expect(service.createRecipe(noNameRecipe)).rejects.toThrow(
        'Recipe name is required',
      );
    });
  
    it('should throw BadRequestException if user does not exist', async () => {
      const noUserRecipe = {
        name: 'Test Recipe',
        user: { connect: { id: 999 } },
      } as RecipeCreateInput;
  
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
  
      await expect(service.createRecipe(noUserRecipe)).rejects.toThrow(
        'User with ID 999 not found',
      );
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 999 },
      });
    });
  
    it('should create a recipe with the main cookbook ID and other cookbook IDs', async () => {
      const userId = 1;
      const mainCookbookId = 101;
      const otherCookbookIds = [102];
  
      const mockUser: User = {
        id: userId,
        mainCookbookId: mainCookbookId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'John1',
        password: '',
        role: 'USER',
        createdAt: undefined,
        updatedAt: undefined,
      };
  
      const createdRecipeInput: RecipeCreateInput = {
        name: 'Original Recipe',
        description: 'A delicious original recipe.',
        directions: 'Step 1: Mix ingredients. Step 2: Cook for 30 minutes.',
        ingredients: { set: ['Flour', 'Sugar', 'Eggs'] },
        prepTime: 15,
        cookTime: 30,
        isPublic: false,
        user: { connect: { id: userId } },
        cookbook: { connect: [...otherCookbookIds.map((id) => ({ id }))] },
      };
  
      const mockCreatedRecipe: Recipe = {
        id: 1,
        name: 'Original Recipe',
        description: 'A delicious original recipe.',
        directions: 'Step 1: Mix ingredients. Step 2: Cook for 30 minutes.',
        ingredients: ['Flour', 'Sugar', 'Eggs'],
        prepTime: 15,
        cookTime: 30,
        isPublic: false,
        user: {   ...mockUser  },
        cookbook: [{ id: mainCookbookId, ratingsCount: 0, } as Cookbook, { id: otherCookbookIds[0], ratingsCount: 0, } as Cookbook],
        userId: userId,
        rating: null,
        ratingsCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
  
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);
      jest.spyOn(prisma.recipe, 'create').mockResolvedValue(mockCreatedRecipe);
  
      const result = await service.createRecipe(createdRecipeInput);
  
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(prisma.recipe.create).toHaveBeenCalledWith({
        data: {
          ...createdRecipeInput,
          cookbook: {
            connect: [{ id: mainCookbookId }, ...otherCookbookIds.map((id) => ({ id }))],
          },
        },
      });
      expect(result).toEqual(mockCreatedRecipe);
    });
  
    it('should create a recipe with only the main cookbook ID when no additional cookbooks are provided', async () => {
      const userId = 1;
      const mainCookbookId = 101;

      const data: RecipeCreateInput = {
        name: 'Test Recipe',
        user: { connect: { id: userId } },
      };

      const mockUser: User = {
        id: userId,
        mainCookbookId: mainCookbookId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'John1',
        password: '',
        role: 'USER',
        createdAt: undefined,
        updatedAt: undefined,
      };

      const mockCreatedRecipe: Recipe = {
        id: 2,
        name: 'Test Recipe',
        userId: userId,
        rating: null,
        ratingsCount: 0,
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredients: null,
        directions: null,
        prepTime: null,
        cookTime: null,
        isPublic: false,
        description: null,
        user: {   ...mockUser  },
        cookbook: [{ id: mainCookbookId, } as Cookbook],
      };

      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);
      jest.spyOn(prisma.recipe, 'create').mockResolvedValue(mockCreatedRecipe);

      const result = await service.createRecipe(data);

      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: userId },
      });
      expect(prisma.recipe.create).toHaveBeenCalledWith({
        data: {
          ...data,
          cookbook: { connect: [{ id: mainCookbookId }] },
        },
      });
      expect(result).toEqual(mockCreatedRecipe);
    });
  });

  describe('deleteRecipe', () => {
    it('should delete a recipe with valid input', async () => {
      // Arrange
      const recipeId = 1;
      const userId = 123;
      const mockRecipe: Recipe = {
        id: 1,
        name: 'Test Recipe',
        description: null,
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: userId,
        rating: null,
        ratingsCount: 0,
        ingredients: null,
        directions: null,
        prepTime: null,
        cookTime: null,
      };
      jest.spyOn(prisma.recipe, 'findUnique').mockResolvedValue(mockRecipe);
      jest.spyOn(prisma.recipe, 'delete').mockResolvedValue(mockRecipe);
      // Act
      const result = await service.deleteRecipe(recipeId, userId);
      // Assert
      expect(prisma.recipe.findUnique).toHaveBeenCalledWith({
        where: { id: recipeId },
        select: { userId: true },
      });
      expect(prisma.recipe.delete).toHaveBeenCalledWith({
        where: { id: recipeId },
      });
      expect(result).toBe(true);
    });
  
    it('should throw an error if the recipe does not exist', async () => {
      // Arrange
      const recipeId = 1;
      const userId = 123;
      jest.spyOn(prisma.recipe, 'findUnique').mockResolvedValue(null);
      // Act & Assert
      await expect(service.deleteRecipe(recipeId, userId)).rejects.toThrow(
        `Recipe with ID ${recipeId} does not exist.`
      );
    });
  
    it('should throw an error if the user does not own the recipe', async () => {
      // Arrange
      const recipeId = 1;
      const userId = 123;
      const otherUserId = 456;
      const mockRecipe: Recipe = {
        id: 1,
        name: 'Test Recipe',
        description: null,
        isPublic: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: userId,
        rating: null,
        ratingsCount: 0,
        ingredients: null,
        directions: null,
        prepTime: null,
        cookTime: null,
      };
      jest.spyOn(prisma.recipe, 'findUnique').mockResolvedValue(mockRecipe);
      // Act & Assert
      await expect(service.deleteRecipe(recipeId, otherUserId)).rejects.toThrow(
        'User does not have permission to delete this recipe.'
      );
    });
  
    it('should throw an error if recipeId or userId is missing', async () => {
      await expect(service.deleteRecipe(null, 123)).rejects.toThrow(
        'Recipe ID and User ID are required to delete a recipe.'
      );
      await expect(service.deleteRecipe(1, null)).rejects.toThrow(
        'Recipe ID and User ID are required to delete a recipe.'
      );
    });
  });
  
  describe('duplicateRecipe', () => {
    it('should throw BadRequestException if the recipe does not exist', async () => {
      jest.spyOn(prisma.recipe, 'findUnique').mockResolvedValue(null);
      await expect(service.duplicateRecipe(123, 456)).rejects.toThrow(
        'Recipe with ID 123 not found',
      );
    });
  
    it('should create a duplicate recipe with a new user ID', async () => {
      const originalRecipe: Recipe = {
        id: 1,
        name: "Original Recipe",
        description: "A delicious original recipe.",
        directions: "Step 1: Mix ingredients. Step 2: Cook for 30 minutes.",
        ingredients: ["Flour", "Sugar", "Eggs"],
        prepTime: 15,
        cookTime: 30,
        isPublic: false,
        userId: 123,
        rating: null,
        ratingsCount: 0, 
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-02T00:00:00Z"),
        user: {
          id: 123,
          name: "John Doe",
          email: "john.doe@example.com",
          username: "John1"
        } as User
      };
      const mockNewRecipe = {
        id: 2,
        name: "Original Recipe-duplicate",
        description: "A delicious original recipe.",
        directions: "Step 1: Mix ingredients. Step 2: Cook for 30 minutes.",
        ingredients: ["Flour", "Sugar", "Eggs"],
        prepTime: 15,
        cookTime: 30,
        isPublic: false,
        userId: 456,
        rating: null,
        ratingsCount: 0,
        createdAt: new Date("2024-01-01T00:00:00Z"),
        updatedAt: new Date("2024-01-02T00:00:00Z"),
        user: {
          id: 456,
          name: "John Doe2",
          email: "john.doe2@example.com",
          username: "John2",
        } as User
      };
      jest.spyOn(prisma.recipe, 'findUnique').mockResolvedValue(originalRecipe);
      jest.spyOn(service, 'createRecipe').mockResolvedValue(mockNewRecipe);
      const result = await service.duplicateRecipe(1, 456);
      expect(prisma.recipe.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        select: {
          name: true,
          description: true,
          directions: true,
          ingredients: true,
          prepTime: true,
          cookTime: true,
        },
      });
      expect(service.createRecipe).toHaveBeenCalledWith({
        name: 'Original Recipe-duplicate',
        description: originalRecipe.description,
        directions: originalRecipe.directions,
        ingredients: { set: originalRecipe.ingredients },
        prepTime: originalRecipe.prepTime,
        cookTime: originalRecipe.cookTime,
        user: { connect: { id: 456 } },
      });
      expect(result).toEqual(mockNewRecipe);
    });
  });

  describe('addRecipeToCookbook', () => {
    it('should throw BadRequestException if recipeId is not provided', async () => {
      const cookbookIds = [1, 2];
      await expect(service.addRecipeToCookbook(cookbookIds, null)).rejects.toThrow(
        'Recipe Id is required'
      );
    });

    it('should throw BadRequestException if recipe does not exist', async () => {
      const recipeId = 1;
      const cookbookIds = [1, 2];
      jest.spyOn(prisma.recipe, 'findUnique').mockResolvedValue(null);
      await expect(service.addRecipeToCookbook(cookbookIds, recipeId)).rejects.toThrow(
        'Recipe does not exist'
      );
    });

    it('should successfully add recipe to cookbooks', async () => {
      const recipeId = 1;
      const cookbookIds = [1, 2];
      const mockRecipe: Recipe = {
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
      };
      const mockCookbooks: Cookbook[] = [
        {
          id: 1,
          name: 'Test Cookbook',
          description: null,
          isPublic: false,
          isMainCookbook: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
          rating: null,
          ratingsCount: 0,
        },
        {
          id: 2,
          name: 'Test Cookbook2',
          description: null,
          isPublic: false,
          isMainCookbook: false,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 2,
          rating: null,
          ratingsCount: 0,
        }
      ];
      const updatedRecipe = { ...mockRecipe, cookbook: mockCookbooks };
      jest.spyOn(prisma.recipe, 'findUnique').mockResolvedValue(mockRecipe);
      jest.spyOn(prisma.cookbook, 'findMany').mockResolvedValue(mockCookbooks);
      jest.spyOn(prisma.recipe, 'update').mockResolvedValue(updatedRecipe);
      jest.spyOn(prisma.cookbook, 'update').mockResolvedValue(mockCookbooks[0]);
      const result = await service.addRecipeToCookbook(cookbookIds, recipeId);
      expect(prisma.recipe.findUnique).toHaveBeenCalledWith({
        where: { id: recipeId },
        include: { cookbook: true },
      });
      expect(prisma.cookbook.findMany).toHaveBeenCalledWith({
        where: { id: { in: cookbookIds } },
      });
      expect(prisma.recipe.update).toHaveBeenCalledWith({
        where: { id: recipeId },
        data: {
          cookbook: {
            connect: mockCookbooks.map((c) => ({ id: c.id })),
          },
        },
        include: { cookbook: true },
      });
      expect(prisma.cookbook.update).toHaveBeenCalledTimes(cookbookIds.length);
      expect(result).toEqual(updatedRecipe);
    });
  });

  describe('editRecipe', () => {
    it('should edit a recipe with valid input', async () => {
      const mockRecipe: Recipe = {
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
      };
      const input: RecipeUpdateManyMutationInput = {
        name: { set: "Updated Recipe Name" },
        ingredients: { set: ['Updated ingredients list'] },
      };
      jest.spyOn(prisma.recipe, 'findUnique').mockResolvedValue(mockRecipe); // Mock finding the recipe
      jest.spyOn(prisma.recipe, 'update').mockResolvedValue(mockRecipe); // Mock updating the recipe
      const result = await service.editRecipe(1, input);
      expect(prisma.recipe.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(prisma.recipe.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: input,
      });
      expect(result).toEqual(mockRecipe);
    });
  
    it('should throw an error if recipe ID is missing', async () => {
      const input: RecipeUpdateManyMutationInput = { name: { set: "Updated Recipe Name" } } as any;
      await expect(service.editRecipe(null, input)).rejects.toThrow('Recipe ID is required to edit recipe');
    });
  
    it('should throw an error if the recipe does not exist', async () => {
      const input: RecipeUpdateManyMutationInput = { name: { set: "Updated Recipe Name" } };
      jest.spyOn(prisma.recipe, 'findUnique').mockResolvedValue(null); // Mock no recipe found
      await expect(service.editRecipe(1, input)).rejects.toThrow('Recipe does not exist');
    });
  
    it('should throw an error if service fails', async () => {
      const input: RecipeUpdateManyMutationInput = { name: { set: "Updated Recipe Name" } };
      jest.spyOn(prisma.recipe, 'findUnique').mockRejectedValue(new Error('Service Error'));
      await expect(service.editRecipe(1, input)).rejects.toThrow('Service Error');
    });
  });

  describe('searchRecipes', () => {
    it('should return recipes that match the query', async () => {
      const mockRecipe: Recipe[] = [
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
        },
      ];
      jest.spyOn(prisma.recipe, 'findMany').mockResolvedValue(mockRecipe);
      const result = await service.searchRecipes('Ingredient1');
      expect(prisma.recipe.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { name: { contains: 'Ingredient1', mode: 'insensitive' } },
            { description: { contains: 'Ingredient1', mode: 'insensitive' } },
            { ingredients: { hasSome: ['Ingredient1'] } },
          ],
        },
      });
      expect(result).toEqual(mockRecipe);
    });
      
    it('should throw a BadRequestException if query is empty', async () => {
      await expect(service.searchRecipes('')).rejects.toThrow(BadRequestException);
    });
      
    it('should throw an error if Prisma throws an exception', async () => {
      jest.spyOn(prisma.recipe, 'findMany').mockRejectedValue(new Error('Database error'));
      await expect(service.searchRecipes('description')).rejects.toThrow('Database error');
      expect(prisma.recipe.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { name: { contains: 'description', mode: 'insensitive' } },
            { description: { contains: 'description', mode: 'insensitive' } },
            { ingredients: { hasSome: ['description'] } },
          ],
        },
      });
    });
  });

  describe('hpGetTopRecipes', () => {
    it('should return top recipes successfully', async () => {
      const mockRecipes: Recipe[] = [
        {
          id: 1,
          name: 'Mock Recipe',
          description: 'A mock recipe description',
          directions: 'Mock directions',
          ingredients: ['Ingredient1', 'Ingredient2'],
          prepTime: 10,
          cookTime: 20,
          isPublic: true,
          userId: 2,
          rating: new Decimal(4.5),
          ratingsCount: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          user: null,
          cookbook: null,
          communities: null,
          _count: null,
        },
      ];
      jest.spyOn(prisma.recipe, 'findMany').mockResolvedValue(mockRecipes);
      const result = await service.hpGetTopRecipes(0, 10);
      expect(prisma.recipe.findMany).toHaveBeenCalledWith({
        orderBy: { rating: 'desc' },
        skip: 0,
        take: 10,
      });
      expect(result).toEqual(mockRecipes);
    });

    it('should throw error if service fails', async () => {
      jest.spyOn(prisma.recipe, 'findMany').mockRejectedValue(new Error('Database error'));
      await expect(service.hpGetTopRecipes(0, 10)).rejects.toThrow('Database error');
    });
  });

  describe('hpGetRecentRecipes', () => {
    it('should return recent recipes successfully', async () => {
      const mockRecipes: Recipe[] = [
        {
          id: 1,
          name: 'Mock Recipe',
          description: 'A mock recipe description',
          directions: 'Mock directions',
          ingredients: ['Ingredient1', 'Ingredient2'],
          prepTime: 10,
          cookTime: 20,
          isPublic: true,
          userId: 2,
          rating: new Decimal(4.5),
          ratingsCount: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
          user: null,
          cookbook: null,
          communities: null,
          _count: null,
        },
      ];
      jest.spyOn(prisma.recipe, 'findMany').mockResolvedValue(mockRecipes);
      const result = await service.hpGetRecentRecipes(0, 10);
      expect(prisma.recipe.findMany).toHaveBeenCalledWith({
        orderBy: { createdAt: 'desc' },
        skip: 0,
        take: 10,
      });
      expect(result).toEqual(mockRecipes);
    });

    it('should throw error if service fails', async () => {
      jest.spyOn(prisma.recipe, 'findMany').mockRejectedValue(new Error('Database error'));
      await expect(service.hpGetRecentRecipes(0, 10)).rejects.toThrow('Database error');
    });
  });

  describe('updateRecipeRating', () => {
    it('should throw BadRequestException if recipeId is not provided', async () => {
      await expect(service.updateRecipeRating(null, 3)).rejects.toThrow(
        'Recipe ID is required to update recipe rating',
      );
    });
  
    it('should throw BadRequestException if rating is out of range', async () => {
      await expect(service.updateRecipeRating(1, -1)).rejects.toThrow(
        'Rating must be between 0 and 5',
      );
      await expect(service.updateRecipeRating(1, 6)).rejects.toThrow(
        'Rating must be between 0 and 5',
      );
    });
  
    it('should throw BadRequestException if the recipe does not exist', async () => {
      const recipeId = 1;
      const rating = 4;
      jest.spyOn(prisma.recipe, 'findUnique').mockResolvedValue(null);
      await expect(service.updateRecipeRating(recipeId, rating)).rejects.toThrow(
        'Recipe does not exist',
      );
    });
  
    it('should update the recipe rating successfully when valid data is provided', async () => {
      const recipeId = 1;
      const rating = 4;
      const mockExistingRecipe: Recipe = {
        id: 1,
        name: 'Mock Recipe',
        description: 'A mock recipe description',
        directions: 'Mock directions',
        ingredients: ['Ingredient1', 'Ingredient2'],
        prepTime: 10,
        cookTime: 20,
        isPublic: false,
        userId: 2,
        rating: new Decimal(3),
        ratingsCount: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: null,
        cookbook: null,
        communities: null,
        _count: null,
      };
      const updatedRecipe: Recipe = {
        id: 1,
        name: 'Mock Recipe',
        description: 'A mock recipe description',
        directions: 'Mock directions',
        ingredients: ['Ingredient1', 'Ingredient2'],
        prepTime: 10,
        cookTime: 20,
        isPublic: false,
        userId: 2,
        rating: new Decimal(3.5),
        ratingsCount: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: null,
        cookbook: null,
        communities: null,
        _count: null,
      };
      jest.spyOn(prisma.recipe, 'findUnique').mockResolvedValue(mockExistingRecipe);
      jest.spyOn(prisma.recipe, 'update').mockResolvedValue(updatedRecipe);
      const result = await service.updateRecipeRating(recipeId, rating);
      expect(prisma.recipe.findUnique).toHaveBeenCalledWith({
        where: { id: recipeId },
        select: { rating: true, ratingsCount: true },
      });
      expect(prisma.recipe.update).toHaveBeenCalledWith({
        where: { id: recipeId },
        data: {
          rating: new Decimal(3.5),
          ratingsCount: 2,
          updatedAt: expect.any(Date),
        },
      });
      expect(result).toEqual(updatedRecipe);
    });
  
    it('should handle errors thrown during the process', async () => {
      const recipeId = 1;
      const rating = 4;
      jest.spyOn(prisma.recipe, 'findUnique').mockRejectedValue(new Error('Database Error'));
      await expect(service.updateRecipeRating(recipeId, rating)).rejects.toThrow('Database Error');
    });
  });
});
