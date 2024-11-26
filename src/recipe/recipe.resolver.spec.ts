import { Test, TestingModule } from '@nestjs/testing';
import { RecipeResolver } from './recipe.resolver';
import { RecipeService } from './recipe.service';
import { RecipeCreateInput } from 'src/@generated/recipe/recipe-create.input';
import { RecipeCreateingredientsInput } from 'src/@generated/recipe/recipe-createingredients.input';
import { Recipe } from 'src/@generated/recipe/recipe.model';

describe('RecipeResolver', () => {
  let resolver: RecipeResolver;
  let service: RecipeService;

  const mockRecipeService = {
    createRecipe: jest.fn(), // Mock method
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeResolver,
        {
          provide: RecipeService,
          useValue: mockRecipeService,
        },
      ],
    }).compile();

    resolver = module.get<RecipeResolver>(RecipeResolver);
    service = module.get<RecipeService>(RecipeService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createRecipe', () => {
    it('should call recipeService.createRecipe with correct arguments', async () => {
      let ingredients = (new RecipeCreateingredientsInput());
      ingredients.set = ['Flour', 'Water', 'Yeast'];
      const input: RecipeCreateInput = {
        name: 'Test Recipe',
        description: 'A test recipe description',
        directions: 'Mix and bake',
        ingredients: ingredients,
        prepTime: 10,
        cookTime: 20,
        isPublic: false,
        user: { connect: { id: 1 } },
        cookbook: { connect: [{ id: 2 }] },
      };

      const result: Recipe = {
        id: 1,
        name: input.name,
        description: input.description,
        directions: input.directions,
        ingredients: input.ingredients.set,
        prepTime: input.prepTime,
        cookTime: input.cookTime,
        isPublic: input.isPublic,
        userId: 1,
        cookbook: [],
        communities: [],
        rating: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      mockRecipeService.createRecipe.mockResolvedValue(result);

      const response = await resolver.createRecipe(input);
      expect(service.createRecipe).toHaveBeenCalledWith(input);
      expect(response).toEqual(result);
    });

    it('should throw an error if recipeService.createRecipe fails', async () => {
      let ingredients = (new RecipeCreateingredientsInput());
      ingredients.set = ['Flour', 'Water', 'Yeast'];
      const input: RecipeCreateInput = {
        name: 'Test Recipe',
        description: 'A test recipe description',
        directions: 'Mix and bake',
        ingredients: ingredients,
        prepTime: 10,
        cookTime: 20,
        isPublic: true,
        user: { connect: { id: 1 } },
        cookbook: { connect: [{ id: 2 }] },
      };

      const error = new Error('Failed to create recipe');
      mockRecipeService.createRecipe.mockRejectedValue(error);

      await expect(resolver.createRecipe(input)).rejects.toThrow(error);
    });

    it('should throw an error when creating a recipe without a name', async () => {
      let ingredients = (new RecipeCreateingredientsInput());
      ingredients.set = ['Flour', 'Water', 'Yeast'];
      const input: RecipeCreateInput = {
        name: '', // No name provided
        description: 'A test recipe description',
        directions: 'Mix and bake',
        ingredients: ingredients,
        prepTime: 10,
        cookTime: 20,
        isPublic: true,
        user: { connect: { id: 1 } },
        cookbook: { connect: [{ id: 2 }] },
      };

      const error = new Error('Recipe name cannot be empty');
      mockRecipeService.createRecipe.mockRejectedValue(error);

      await expect(resolver.createRecipe(input)).rejects.toThrow('Recipe name cannot be empty');
      expect(service.createRecipe).toHaveBeenCalledWith(input);
    });
  });
});
