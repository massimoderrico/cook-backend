import { Test, TestingModule } from '@nestjs/testing';
import { RecipeResolver } from './recipe.resolver';
import { RecipeService } from './recipe.service';
import { Recipe } from '../@generated/recipe/recipe.model';
import { BadRequestException } from '@nestjs/common';

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
});
