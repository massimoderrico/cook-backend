import { Resolver, Mutation, Args, Query, Int } from '@nestjs/graphql';
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
    @Args('data') data: CookbookUpdateInput,
    @Args("cookbookId", { type: () => Int}) cookbookId: number,
    @Args("recipeId", {type: () => Int}) recipeId: number
  ): Promise<Cookbook> {
    try {
      return await this.cookbookService.deleteRecipeFromCookbook(data, cookbookId, recipeId);
    } catch (error) {
      throw new Error(`Failed to remove recipe from cookbook: ${error.message}`);
    }
  }
}
