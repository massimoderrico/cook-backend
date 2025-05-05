import { Cookbook, Recipe, User } from '@prisma/client';
import { RecipeCreateInput } from 'src/@generated/recipe/recipe-create.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RecipeUpdateInput } from 'src/@generated/recipe/recipe-update.input';
import { RecipeUpdateManyMutationInput } from 'src/@generated/recipe/recipe-update-many-mutation.input';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class RecipeService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new recipe.
   */
  async createRecipe(data: RecipeCreateInput): Promise<Recipe> {
    if (!data.name) {
      throw new BadRequestException('Recipe name is required');
    }

    const userId = data.user.connect.id;
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      throw new BadRequestException(`User with ID ${userId} not found`);
    }

    const mainCookbookId = user.mainCookbookId;
    if (!mainCookbookId) {
      throw new BadRequestException(`User with ID ${userId} is missing a mainCookbookId`);
    }

    return this.prisma.recipe.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
        cookbook: {
          connect: data.cookbook?.connect
            ? [{ id: mainCookbookId }, ...data.cookbook.connect]
            : [{ id: mainCookbookId }],
        },
      },
    });
  }

  /**
   * Delete a recipe.
   */
  async deleteRecipe(recipeId: number, userId: string): Promise<boolean> {
    if (!recipeId || !userId) {
      throw new BadRequestException('Recipe ID and User ID are required to delete a recipe.');
    }

    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { userId: true },
    });

    if (!recipe) {
      throw new BadRequestException(`Recipe with ID ${recipeId} does not exist.`);
    }

    if (recipe.userId !== userId) {
      throw new BadRequestException('User does not have permission to delete this recipe.');
    }

    await this.prisma.recipe.delete({ where: { id: recipeId } });
    return true;
  }

  /**
   * Edit a recipe.
   */
  async editRecipe(recipeId: number, data: RecipeUpdateManyMutationInput): Promise<Recipe> {
    if (!recipeId) {
      throw new BadRequestException('Recipe ID is required to edit a recipe');
    }

    const existingRecipe = await this.prisma.recipe.findUnique({ where: { id: recipeId } });
    if (!existingRecipe) {
      throw new BadRequestException('Recipe does not exist');
    }

    return this.prisma.recipe.update({ where: { id: recipeId }, data });
  }

  /**
   * Add a recipe to multiple cookbooks.
   */
  async addRecipeToCookbook(cookbookIds: number[], recipeId: number): Promise<Recipe> {
    if (!recipeId) {
      throw new BadRequestException('Recipe ID is required');
    }

    const recipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      include: { cookbook: true },
    });

    if (!recipe) {
      throw new BadRequestException('Recipe does not exist');
    }

    const cookbooks = await this.prisma.cookbook.findMany({
      where: { id: { in: cookbookIds } },
    });

    const validCookbookIds = cookbooks.map((c) => c.id);
    const connectCookbooks = validCookbookIds.map((id) => ({ id }));

    const updatedRecipe = await this.prisma.recipe.update({
      where: { id: recipeId },
      data: { cookbook: { connect: connectCookbooks } },
      include: { cookbook: true },
    });

    await Promise.all(
      validCookbookIds.map((id) =>
        this.prisma.cookbook.update({
          where: { id },
          data: { recipes: { connect: { id: recipeId } } },
        }),
      ),
    );

    return updatedRecipe;
  }

  /**
   * Duplicate a recipe for a new user.
   */
  async duplicateRecipe(recipeId: number, newUserId: string): Promise<Recipe> {
    const originalRecipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      select: {
        name: true,
        description: true,
        directions: true,
        ingredients: true,
        prepTime: true,
        cookTime: true,
        image: true,
      },
    });

    if (!originalRecipe) {
      throw new BadRequestException(`Recipe with ID ${recipeId} not found`);
    }

    const recipeData: RecipeCreateInput = {
      name: `${originalRecipe.name}-duplicate`,
      description: originalRecipe.description,
      directions: { set: originalRecipe.directions },
      ingredients: { set: originalRecipe.ingredients },
      prepTime: originalRecipe.prepTime,
      cookTime: originalRecipe.cookTime,
      image: originalRecipe.image,
      user: { connect: { id: newUserId } },
    };

    return this.createRecipe(recipeData);
  }

  /**
   * Search for recipes by query.
   */
  async searchRecipes(query: string): Promise<Recipe[]> {
    if (!query) {
      throw new BadRequestException('Query is required');
    }

    return this.prisma.recipe.findMany({
      where: {
        isPublic: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
          { ingredients: { hasSome: query.split(',').map((ingredient) => ingredient.trim()) } },
        ],
      },
    });
  }

  /**
   * Get top-rated recipes.
   */
  async hpGetTopRecipes(skip: number, first: number): Promise<Recipe[]> {
    return this.prisma.recipe.findMany({
      where: { rating: { not: null }, isPublic: true },
      orderBy: { rating: 'desc' },
      skip,
      take: first,
    });
  }

  /**
   * Get recently created recipes.
   */
  async hpGetRecentRecipes(skip: number, first: number): Promise<Recipe[]> {
    return this.prisma.recipe.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: 'desc' },
      skip,
      take: first,
    });
  }

  /**
   * Update a recipe's rating.
   */
  async updateRecipeRating(recipeId: number, rating: number): Promise<Recipe> {
    if (!recipeId) {
      throw new BadRequestException('Recipe ID is required to update recipe rating');
    }

    if (rating < 0 || rating > 5) {
      throw new BadRequestException('Rating must be between 0 and 5');
    }

    const existingRecipe = await this.prisma.recipe.findUnique({
      where: { id: recipeId },
      select: { rating: true, ratingsCount: true },
    });

    if (!existingRecipe) {
      throw new BadRequestException('Recipe does not exist');
    }

    const currentRating = existingRecipe.rating || new Decimal(0);
    const updatedRatingsCount = existingRecipe.ratingsCount + 1;
    const newRating = new Decimal(
      (currentRating.toNumber() * existingRecipe.ratingsCount + rating) / updatedRatingsCount,
    );

    return this.prisma.recipe.update({
      where: { id: recipeId },
      data: {
        rating: newRating,
        ratingsCount: updatedRatingsCount,
        updatedAt: new Date(),
      },
    });
  }
}


