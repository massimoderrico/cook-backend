import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreateOneRecipeArgs } from 'src/@generated/recipe/create-one-recipe.args';
import { Recipe } from 'src/@generated/recipe/recipe.model';
import { RecipeService } from './recipe.service';
import { RecipeCreateInput } from 'src/@generated/recipe/recipe-create.input';
import { Cookbook } from '@prisma/client';

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

    @Mutation(() => Recipe, {nullable:})
    async addRecipeToCookbook(@Args('data') recipe: Recipe, cookbooks: Cookbook[]): Promise<Recipe> {
        try {
            return this.recipeService.addRecipeToCookbook(recipe, cookbooks);
        } catch (error) {
            throw error;
        }
    }


}
