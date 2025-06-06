import { Resolver, Mutation, Args, Query, Int, Float } from '@nestjs/graphql';
import { CookbookService } from './cookbook.service';
import { Cookbook } from '../@generated/cookbook/cookbook.model';
import { Recipe } from '../@generated/recipe/recipe.model';
import { CookbookCreateInput } from '../@generated/cookbook/cookbook-create.input';
import { CookbookUpdateManyMutationInput } from '../@generated/cookbook/cookbook-update-many-mutation.input';
import { CookbookUpdateInput } from 'src/@generated/cookbook/cookbook-update.input';

@Resolver(() => Cookbook)
export class CookbookResolver {
  constructor(private readonly cookbookService: CookbookService) {}

  @Mutation(() => Cookbook)
  async createCookbook(@Args('data') data: CookbookCreateInput,): Promise<Cookbook> {
    try {
      return await this.cookbookService.createCookbook(data);
    } catch (error) {
      throw new Error(`Failed to create cookbook: ${error.message}`);
    }
  }

  @Query(() => [Cookbook], { nullable: true })
  async getCookbooksByIds(@Args('ids', { type: () => [Number] }) ids: number[]): Promise<Cookbook[]> {
    try {
      return await this.cookbookService.getCookbooksByIds(ids);
    } catch (error) {
      throw new Error(`Failed to get cookbooks: ${error.message}`);
    }
  }

  @Query(() => [Recipe], { nullable: true })
  async getRecipesByCookbookId(@Args('cookbookId', { type: () => Number }) cookbookId: number): Promise<Recipe[]> {
    try {
      return await this.cookbookService.getRecipesByCookbookId(cookbookId);
    } catch (error) {
      throw new Error(`Failed to get recipes for cookbook ID ${cookbookId}: ${error.message}`);
    }
  }

  @Mutation(() => Boolean)
  async deleteCookbook(
    @Args('cookbookId', { type: () => Int }) cookbookId: number,
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<boolean> {
    try {
      return await this.cookbookService.deleteCookbook(cookbookId, userId);
    } catch (error) {
      throw new Error(`Failed to delete cookbook: ${error.message}`);
    }
  }

  @Mutation(() => Cookbook)
  async editCookbook(
    @Args('cookbookId', { type: () => Int }) cookbookId: number,
    @Args('data') data: CookbookUpdateManyMutationInput,
  ): Promise<Cookbook> {
    try {
      return await this.cookbookService.editCookbook(cookbookId, data);
    } catch (error) {
      throw new Error(`Failed to edit cookbook: ${error.message}`);
    }
  }

  @Mutation(() => Cookbook)
  async deleteRecipeFromCookbook(
    @Args("cookbookId", { type: () => Int}) cookbookId: number,
    @Args("recipeId", {type: () => Int}) recipeId: number
  ): Promise<Cookbook> {
    try {
      return await this.cookbookService.deleteRecipeFromCookbook(cookbookId, recipeId);
    } catch (error) {
      throw new Error(`Failed to remove recipe from cookbook: ${error.message}`);
    }
  }

  @Query(() => [Cookbook], { nullable: true })
  async searchCookbook(@Args('query', { type: () => String }) query: string): Promise<Cookbook[]> {
    try {
      return await this.cookbookService.searchCookbook(query);
    } catch (error) {
      throw new Error(`Failed to find any cookbooks matching ${query}: ${error.message}`);
    }
  }

  @Mutation(() => Cookbook)
  async updateCookbookRating(  
    @Args("cookbookId", { type: () => Int }) cookbookId: number,
    @Args("rating", { type: () => Float }) rating: number,
  ): Promise<Cookbook>{
    try {
      return await this.cookbookService.updateCookbookRating(cookbookId, rating)
    } catch (error) {
      throw new Error(`Failed to update cookbook rating: ${error.message}`)
    }
  }
  
  @Mutation(() => Cookbook)
  async addRecipesToCookbook(
    @Args("cookbookId", { type: () => Int }) cookbookId: number,
    @Args("recipeIds", { type: () => [Int]}) recipeIds: number[],
  ): Promise<Cookbook>{
    try {
      return await this.cookbookService.addRecipesToCookbook(cookbookId, recipeIds)
    } catch (error) {
      throw new Error(`Failed to add recipes to cookbook: ${error.message}`)
    }
  }
}
