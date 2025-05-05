import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cookbook, Recipe } from '@prisma/client';
import { CookbookCreateInput } from '../@generated/cookbook/cookbook-create.input';
import { CookbookUpdateManyMutationInput } from '../@generated/cookbook/cookbook-update-many-mutation.input';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class CookbookService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create a new cookbook.
   */
  async createCookbook(data: CookbookCreateInput): Promise<Cookbook> {
    if (!data.name) {
      throw new BadRequestException('Cookbook name is required for creation');
    }

    const userId = data.user.connect.id;

    // Ensure the user exists
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException(`User with ID ${userId} does not exist`);
    }

    // Create the cookbook
    return this.prisma.cookbook.create({
      data: {
        ...data,
        user: { connect: { id: userId } },
      },
    });
  }

  /**
   * Get cookbooks by their IDs.
   */
  async getCookbooksByIds(ids: number[]): Promise<Cookbook[]> {
    if (!ids || ids.length === 0) {
      throw new BadRequestException('Array of cookbook IDs must not be empty');
    }

    return this.prisma.cookbook.findMany({
      where: { id: { in: ids } },
      include: { recipes: true },
    });
  }

  /**
   * Get recipes by cookbook ID.
   */
  async getRecipesByCookbookId(cookbookId: number): Promise<Recipe[]> {
    if (!cookbookId) {
      throw new BadRequestException('Cookbook ID is required');
    }

    const cookbook = await this.prisma.cookbook.findUnique({
      where: { id: cookbookId },
      include: {
        recipes: {
          include: {
            cookbook: true,
            communities: true,
          },
        },
      },
    });

    if (!cookbook) {
      throw new BadRequestException(`Cookbook with ID ${cookbookId} does not exist`);
    }

    return cookbook.recipes;
  }

  /**
   * Delete a cookbook.
   */
  async deleteCookbook(cookbookId: number, userId: string): Promise<boolean> {
    if (!cookbookId || !userId) {
      throw new BadRequestException('Cookbook ID and User ID are required to delete a cookbook.');
    }

    const cookbook = await this.prisma.cookbook.findUnique({
      where: { id: cookbookId },
      select: { userId: true },
    });

    if (!cookbook) {
      throw new BadRequestException(`Cookbook with ID ${cookbookId} does not exist.`);
    }

    if (cookbook.userId !== userId) {
      throw new BadRequestException('User does not have permission to delete this cookbook.');
    }

    await this.prisma.cookbook.delete({ where: { id: cookbookId } });
    return true;
  }

  /**
   * Edit a cookbook.
   */
  async editCookbook(cookbookId: number, data: CookbookUpdateManyMutationInput): Promise<Cookbook> {
    if (!cookbookId) {
      throw new BadRequestException('Cookbook ID is required');
    }

    const existingCookbook = await this.prisma.cookbook.findUnique({ where: { id: cookbookId } });
    if (!existingCookbook) {
      throw new BadRequestException(`Cookbook with ID ${cookbookId} does not exist`);
    }

    return this.prisma.cookbook.update({
      where: { id: cookbookId },
      data,
    });
  }

  /**
   * Delete a recipe from a cookbook.
   */
  async deleteRecipeFromCookbook(cookbookId: number, recipeId: number): Promise<Cookbook> {
    if (!cookbookId) {
      throw new BadRequestException('Cookbook ID is required');
    }

    const existingCookbook = await this.prisma.cookbook.findUnique({ where: { id: cookbookId } });
    if (!existingCookbook) {
      throw new BadRequestException(`Cookbook with ID ${cookbookId} does not exist`);
    }

    const updatedCookbook = await this.prisma.cookbook.update({
      where: { id: cookbookId },
      data: {
        recipes: { disconnect: { id: recipeId } },
      },
      include: { recipes: true },
    });

    await this.prisma.recipe.update({
      where: { id: recipeId },
      data: {
        cookbook: { disconnect: { id: cookbookId } },
      },
    });

    return updatedCookbook;
  }

  /**
   * Search for cookbooks by query.
   */
  async searchCookbook(query: string): Promise<Cookbook[]> {
    if (!query) {
      throw new BadRequestException('Query is required');
    }

    return this.prisma.cookbook.findMany({
      where: {
        isPublic: true,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { description: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: { recipes: true },
    });
  }

  /**
   * Update a cookbook's rating.
   */
  async updateCookbookRating(cookbookId: number, rating: number): Promise<Cookbook> {
    if (!cookbookId) {
      throw new BadRequestException('Cookbook ID is required to update cookbook rating');
    }

    if (rating < 0 || rating > 5) {
      throw new BadRequestException('Rating must be between 0 and 5');
    }

    const existingCookbook = await this.prisma.cookbook.findUnique({
      where: { id: cookbookId },
      select: { rating: true, ratingsCount: true },
    });

    if (!existingCookbook) {
      throw new BadRequestException('Cookbook does not exist');
    }

    const currentRating = existingCookbook.rating || new Decimal(0);
    const updatedRatingsCount = existingCookbook.ratingsCount + 1;
    const newRating = new Decimal(
      (currentRating.toNumber() * existingCookbook.ratingsCount + rating) / updatedRatingsCount,
    );

    return this.prisma.cookbook.update({
      where: { id: cookbookId },
      data: {
        rating: newRating,
        ratingsCount: updatedRatingsCount,
        updatedAt: new Date(),
      },
    });
  }

  /**
   * Add recipes to a cookbook.
   */
  async addRecipesToCookbook(cookbookId: number, recipeIds: number[]): Promise<Cookbook> {
    if (!cookbookId) {
      throw new BadRequestException('Cookbook ID is required');
    }

    const cookbook = await this.prisma.cookbook.findUnique({
      where: { id: cookbookId },
      include: { recipes: true },
    });

    if (!cookbook) {
      throw new BadRequestException('Cookbook does not exist');
    }

    const recipes = await this.prisma.recipe.findMany({
      where: { id: { in: recipeIds } },
    });

    const validRecipeIds = recipes.map((r) => r.id);
    const connectRecipes = validRecipeIds.map((id) => ({ id }));

    const updatedCookbook = await this.prisma.cookbook.update({
      where: { id: cookbookId },
      data: { recipes: { connect: connectRecipes } },
      include: { recipes: true },
    });

    await Promise.all(
      validRecipeIds.map((id) =>
        this.prisma.recipe.update({
          where: { id },
          data: { cookbook: { connect: { id: cookbookId } } },
        }),
      ),
    );

    return updatedCookbook;
  }
}