import { Test, TestingModule } from '@nestjs/testing';
import { RecipeResolver } from './recipe.resolver';
import { RecipeService } from './recipe.service';
import { Recipe } from '../@generated/recipe/recipe.model';
import { BadRequestException } from '@nestjs/common';
import { RecipeUpdateManyMutationInput } from 'src/@generated/recipe/recipe-update-many-mutation.input';
import { Decimal } from '@prisma/client/runtime/library';

describe('RecipeResolver', () => {
  let resolver: RecipeResolver;
  let service: RecipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RecipeResolver,
        {
          provide: RecipeService,
          useValue: {
            duplicateRecipe: jest.fn(),
            deleteRecipe: jest.fn(),
            addRecipeToCookbook: jest.fn(),
            editRecipe: jest.fn(),
            searchRecipes: jest.fn(),
            hpGetTopRecipes: jest.fn(),
            hpGetRecentRecipes: jest.fn(),
            updateRecipeRating: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<RecipeResolver>(RecipeResolver);
    service = module.get<RecipeService>(RecipeService);
  });

  it('resolver and service should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('duplicateRecipe', () => {
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

    it('should duplicate the recipe successfully', async () => {
      jest.spyOn(service, 'duplicateRecipe').mockResolvedValue(mockRecipe);
      const result = await resolver.duplicateRecipe(1, 2);
      expect(service.duplicateRecipe).toHaveBeenCalledWith(1, 2);
      expect(result).toEqual(mockRecipe);
    });

    it('should throw an error when the service throws an exception', async () => {
      jest
        .spyOn(service, 'duplicateRecipe')
        .mockRejectedValue(new BadRequestException('Failed to duplicate recipe'));
      await expect(resolver.duplicateRecipe(1, 2)).rejects.toThrow(
        'Failed to duplicate recipe',
      );
      expect(service.duplicateRecipe).toHaveBeenCalledWith(1, 2);
    });
  });

  describe('deleteRecipe', () => {
    it('should delete a recipe with valid input', async () => {
      // Arrange
      const recipeId = 1;
      const userId = 123;
      jest.spyOn(service, 'deleteRecipe').mockResolvedValue(true); // Mock service response
      // Act
      const result = await resolver.deleteRecipe(recipeId, userId);
      // Assert
      expect(service.deleteRecipe).toHaveBeenCalledWith(recipeId, userId);
      expect(result).toBe(true);
    });

    it('should throw an error if the service throws an error', async () => {
      // Arrange
      const recipeId = 1;
      const userId = 123;
      jest.spyOn(service, 'deleteRecipe').mockRejectedValue(new Error('Service Error'));
      // Act & Assert
      await expect(resolver.deleteRecipe(recipeId, userId)).rejects.toThrow(
        'Failed to delete recipe: Service Error'
      );
    });
  });

  describe('addRecipeToCookbook', () => {
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

    it('should add recipe to the cookbooks successfully', async () => {
      const cookbookIds = [1, 2];
      const recipeId = 1;
      jest.spyOn(service, 'addRecipeToCookbook').mockResolvedValue(mockRecipe);
      const result = await resolver.addRecipeToCookbook(cookbookIds, recipeId);
      expect(service.addRecipeToCookbook).toHaveBeenCalledWith(cookbookIds, recipeId);
      expect(result).toEqual(mockRecipe);
    });

    it('should throw an error if the service throws an exception', async () => {
      const cookbookIds = [1, 2];
      const recipeId = 1;
      jest.spyOn(service, 'addRecipeToCookbook').mockRejectedValue(new BadRequestException('Error occurred'));
      await expect(resolver.addRecipeToCookbook(cookbookIds, recipeId)).rejects.toThrow(
        'Error occurred'
      );
    });
  });

  describe('editRecipe', () => {
    it('should edit a recipe with valid input', async () => {
      // Arrange
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
      jest.spyOn(service, 'editRecipe').mockResolvedValue(mockRecipe);
      // Act
      const result = await resolver.editRecipe(1, input);
      // Assert
      expect(service.editRecipe).toHaveBeenCalledWith(1, input);
      expect(result).toEqual(mockRecipe);
    });
  
    it('should throw an error if service fails', async () => {
      const input = { name: 'Updated Recipe' } as any;
      jest.spyOn(service, 'editRecipe').mockRejectedValue(new Error('Service Error'));
      await expect(resolver.editRecipe(1, input)).rejects.toThrow('Failed to edit recipe: Service Error');
    });
  
    it('should throw an error if recipe does not exist', async () => {
      const input: RecipeUpdateManyMutationInput = {
        name: { set: "Updated Recipe Name" },
        ingredients: { set: ['Updated ingredients list'] },
      };
      jest.spyOn(service, 'editRecipe').mockRejectedValue(new Error('Recipe with ID 1 does not exist'));
      await expect(resolver.editRecipe(1, input)).rejects.toThrow('Failed to edit recipe: Recipe with ID 1 does not exist');
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
      jest.spyOn(service, 'searchRecipes').mockResolvedValue(mockRecipe);
      const result = await resolver.searchRecipes('Mock Recipe');
      expect(service.searchRecipes).toHaveBeenCalledWith('Mock Recipe');
      expect(result).toEqual(mockRecipe);
    });
      
    it('should throw an error when the service throws an exception', async () => {
      jest.spyOn(service, 'searchRecipes').mockRejectedValue(new Error('Some internal error'));
      await expect(resolver.searchRecipes('test')).rejects.toThrow(
        'Failed to find any recipes matching test: Some internal error',
      );
      expect(service.searchRecipes).toHaveBeenCalledWith('test');
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
      jest.spyOn(service, 'hpGetTopRecipes').mockResolvedValue(mockRecipes);
      const result = await resolver.hpGetTopRecipes(0, 10);
      expect(service.hpGetTopRecipes).toHaveBeenCalledWith(0, 10);
      expect(result).toEqual(mockRecipes);
    });

    it('should throw an error when the service fails', async () => {
      jest.spyOn(service, 'hpGetTopRecipes').mockRejectedValue(new Error('Failed to fetch top recipes'));
      await expect(resolver.hpGetTopRecipes(0, 10)).rejects.toThrow('Failed to find any recipes: Failed to fetch top recipes');
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
      jest.spyOn(service, 'hpGetRecentRecipes').mockResolvedValue(mockRecipes);
      const result = await resolver.hpGetRecentRecipes(0, 10);
      expect(service.hpGetRecentRecipes).toHaveBeenCalledWith(0, 10);
      expect(result).toEqual(mockRecipes);
    });

    it('should throw an error when the service fails', async () => {
      jest.spyOn(service, 'hpGetRecentRecipes').mockRejectedValue(new Error('Failed to fetch top recipes'));
      await expect(resolver.hpGetRecentRecipes(0, 10)).rejects.toThrow('Failed to find any recipes: Failed to fetch top recipes');
    });
  });

  describe('updateRecipeRating', () => {
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
      rating: new Decimal(4.5),
      ratingsCount: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: null,
      cookbook: null,
      communities: null,
      _count: null,
    };

    it('should update the recipe rating successfully', async () => {
      const recipeId = 1;
      const rating = 4.8;
      jest.spyOn(service, 'updateRecipeRating').mockResolvedValue(mockRecipe);
      const result = await resolver.updateRecipeRating(recipeId, rating);
      expect(service.updateRecipeRating).toHaveBeenCalledWith(recipeId, rating);
      expect(result).toEqual(mockRecipe);
    });

    it('should throw an error if the recipe does not exist', async () => {
      const recipeId = 999;
      const rating = 4.5;
      jest
        .spyOn(service, 'updateRecipeRating')
        .mockRejectedValue(new BadRequestException('Recipe does not exist'));
      await expect(resolver.updateRecipeRating(recipeId, rating)).rejects.toThrow(
        'Failed to update recipe rating: Recipe does not exist',
      );
      expect(service.updateRecipeRating).toHaveBeenCalledWith(recipeId, rating);
    });

    it('should handle unexpected service errors', async () => {
      const recipeId = 1;
      const rating = 4.5;
      jest
        .spyOn(service, 'updateRecipeRating')
        .mockRejectedValue(new Error('Unexpected error'));
      await expect(resolver.updateRecipeRating(recipeId, rating)).rejects.toThrow(
        'Failed to update recipe rating: Unexpected error',
      );
      expect(service.updateRecipeRating).toHaveBeenCalledWith(recipeId, rating);
    });
  });
});
