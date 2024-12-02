import { Args, Mutation, Resolver, Int } from '@nestjs/graphql';
import { CreateOneRecipeArgs } from 'src/@generated/recipe/create-one-recipe.args';
import { Recipe } from 'src/@generated/recipe/recipe.model';
import { RecipeService } from './recipe.service';
import { RecipeCreateInput } from 'src/@generated/recipe/recipe-create.input';

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
}
