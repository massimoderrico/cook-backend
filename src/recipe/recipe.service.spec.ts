import { Test, TestingModule } from '@nestjs/testing';
import { RecipeService } from './recipe.service';
import { PrismaService } from '../prisma/prisma.service';
import { Recipe } from '../@generated/recipe/recipe.model';
import { User } from '../@generated/user/user.model';

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
