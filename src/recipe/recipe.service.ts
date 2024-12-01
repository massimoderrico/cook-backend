import { Cookbook, Recipe, User } from '@prisma/client';
import { RecipeCreateInput } from 'src/@generated/recipe/recipe-create.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';


@Injectable()
export class RecipeService {
    constructor(private prisma: PrismaService){}
    async createRecipe(data: RecipeCreateInput): Promise<Recipe> {
        try {
            if (!data.name) {
                throw new BadRequestException('Recipe name is required');
            }
            let userId: number = data.user.connect.id
            let user: User = await this.prisma.user.findUnique({where: {id: userId}})
            let mainCookbookId: number = user.mainCookbookId;
            return this.prisma.recipe.create({
                data: {
                    ...data,
                    user: {
                        connect: { id: userId },
                    },
                    cookbook: {
                        connect: [{ id: mainCookbookId }, ...data.cookbook.connect],
                    },
                },
            });
        } 
        catch (error) {
            throw error;
        }
          
    }

    async addRecipeToCookbook(data: Recipe, cookbooks: Array<Cookbook>): Promise<Recipe> {
        //TODO: Handle how we will process the update data. Will it be cookbook id, or whole cookbook object,
        //TBD with frontend work
        try {
            let recipe: Recipe = await this.prisma.recipe.findUnique({where: {id: data.id}})
            let recipeId: number = recipe.id
            return this.prisma.recipe.update({
                where: {
                    id: recipeId,
                },
                data: {
                    cookbook:{
                        connect: cookbooks
                    }
                },
            })
        }
        catch (error) {
            throw error;
        }
    }
}
    

