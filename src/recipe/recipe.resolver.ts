import { Args, Mutation, Query, Resolver, Int, Float } from '@nestjs/graphql';
import { Recipe } from 'src/@generated/recipe/recipe.model';
import { RecipeService } from './recipe.service';
import { RecipeCreateInput } from 'src/@generated/recipe/recipe-create.input';
import { RecipeUpdateManyMutationInput } from 'src/@generated/recipe/recipe-update-many-mutation.input';

@Resolver(() => Recipe)
export class RecipeResolver {
    constructor(private readonly recipeService: RecipeService) {}
    
    @Mutation(() => Recipe, {nullable: true})
    async createRecipe(@Args('data') recipe: RecipeCreateInput): Promise<Recipe> {
        try{
            return this.recipeService.createRecipe(recipe);
        } catch(err){
            throw err;
        }
    }

    @Mutation(() => Boolean)
    async deleteRecipe(
        @Args('recipeId', { type: () => Int }) recipeId: number,
        @Args('userId', { type: () => Int }) userId: number,
    ): Promise<boolean> {
        try {
            return await this.recipeService.deleteRecipe(recipeId, userId);
        } catch (error) {
            throw new Error(`Failed to delete recipe: ${error.message}`);
        }
    }

    @Mutation(() => Recipe)
    async editRecipe(  
        @Args("recipeId", { type: () => Int }) recipeId: number,
        @Args("data") data: RecipeUpdateManyMutationInput
    ): Promise<Recipe>{
        try {
            return await this.recipeService.editRecipe(recipeId, data)
        } catch (error) {
            throw new Error(`Failed to edit recipe: ${error.message}`)
        }
    }

    @Mutation(() => Recipe, {nullable: true})
    async addRecipeToCookbook(
        @Args('cookbookIds', {type: () => [Int]} ) cookbookIds: number[],
        @Args('recipeId', {type: () => Int}) recipeId: number
    ): Promise<Recipe> { 
        try {
            return this.recipeService.addRecipeToCookbook(cookbookIds, recipeId);
        } catch (error) { 
            throw error;
        }
    }
    
    @Mutation(() => Recipe, { nullable: true })
    async duplicateRecipe(
        @Args('recipeId', { type: () => Int }) recipeId: number,
        @Args('newUserId', { type: () => Int }) newUserId: number,
    ): Promise<Recipe> {
        try {
            return await this.recipeService.duplicateRecipe(recipeId, newUserId);
        } catch (error) {
            throw new Error(`Failed to duplicate recipe: ${error.message}`);
        }
    }

    @Query(() => [Recipe], { nullable: true })
    async searchRecipes(@Args('query', { type: () => String }) query: string): Promise<Recipe[]> {
        try {
            return await this.recipeService.searchRecipes(query);
        } catch (error) {
            throw new Error(`Failed to find any recipes matching ${query}: ${error.message}`);
        }
    }

    @Query(() => [Recipe], { nullable: true })
    async hpGetTopRecipes(
        @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
        @Args('first', { type: () => Int, defaultValue: 10 }) first: number,
    ): Promise<Recipe[]> {
        try {
            return await this.recipeService.hpGetTopRecipes(skip, first);
        } catch (error) {
            throw new Error(`Failed to find any recipes: ${error.message}`);
        }
    }

    @Query(() => [Recipe], { nullable: true })
    async hpGetRecentRecipes(
        @Args('skip', { type: () => Int, defaultValue: 0 }) skip: number,
        @Args('first', { type: () => Int, defaultValue: 10 }) first: number,
    ): Promise<Recipe[]> {
        try {
            return await this.recipeService.hpGetRecentRecipes(skip, first);
        } catch (error) {
            throw new Error(`Failed to find any recipes: ${error.message}`);
        }
    }

    @Mutation(() => Recipe)
    async updateRecipeRating(  
        @Args("recipeId", { type: () => Int }) recipeId: number,
        @Args("rating", { type: () => Float }) rating: number,
    ): Promise<Recipe>{
        try {
            return await this.recipeService.updateRecipeRating(recipeId, rating)
        } catch (error) {
            throw new Error(`Failed to update recipe rating: ${error.message}`)
        }
    }
}
