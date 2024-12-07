import { Test, TestingModule } from '@nestjs/testing';
import { RecipeResolver } from './recipe.resolver';
import { RecipeService } from './recipe.service';
import { Recipe } from '../@generated/recipe/recipe.model';
import { BadRequestException } from '@nestjs/common';
import { RecipeUpdateManyMutationInput } from 'src/@generated/recipe/recipe-update-many-mutation.input';

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
});
