import { Cookbook, Recipe, User } from '@prisma/client';
import { RecipeCreateInput } from 'src/@generated/recipe/recipe-create.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RecipeUpdateInput } from 'src/@generated/recipe/recipe-update.input';
import { CookbookResolver } from 'src/cookbook/cookbook.resolver';
import { connect } from 'http2';


@Injectable()
export class RecipeService {
    constructor(private prisma: PrismaService, private resolver: CookbookResolver){}

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

    async addRecipeToCookbook(data: RecipeUpdateInput, cookbookIds: number[], recipeId: number): Promise<Recipe> {
        //TODO: Handle how we will process the update data. Will it be cookbook id, or whole cookbook object,
        // TBD with frontend work
        // Input: recipeId, CookbookId[], recipe object
        // Output: Adds recipe to all cookbooks in CookbookId, and add all cookbookId to recipe
        try {
            if (!recipeId){
                throw new BadRequestException("Recipe Id is required")
            }
            let recipe = await this.prisma.recipe.findUnique({
                where: {id: recipeId},
            })

            if (!recipe){
                throw new BadRequestException("Recipe does not exist")
            }
            //const cookbooks: [Cookbook] = await this.resolver.getCookbooksByIds(cookbookIds)
            
            const connectCookbooks = cookbookIds.map((id) => ({ id }))

            data.cookbook = {
                connect: connectCookbooks,
                ...(data.cookbook || {})
            }

            return await this.prisma.recipe.update({ 
                where: {
                    id: recipeId,
                },
                data,
                include: {
                    cookbook: true,
                }
            })
        }
        catch (error) {
            throw error;
        }
    }
}


