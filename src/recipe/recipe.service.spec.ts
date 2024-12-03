import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { PrismaService } from '../prisma/prisma.service';
import { Recipe } from '../@generated/recipe/recipe.model';
import { User } from '../@generated/user/user.model';
import { RecipeCreateInput } from 'src/@generated/recipe/recipe-create.input';
import { connect } from 'http2';
import { Cookbook } from '@prisma/client';
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
        cookbook: { connect: [{ id : mainCookbookId},...otherCookbookIds.map((id) => ({ id }))] },
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
        cookbook: [{ id: mainCookbookId } as Cookbook, { id: otherCookbookIds[0] } as Cookbook],
        userId: userId,
        rating: null,
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
        createdAt: new Date(),
        updatedAt: new Date(),
        ingredients: null,
        directions: null,
        prepTime: null,
        cookTime: null,
        isPublic: false,
        description: null,
        user: {   ...mockUser  },
        cookbook: [{ id: mainCookbookId } as Cookbook],
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
});
