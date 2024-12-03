import { Recipe, User } from '@prisma/client';
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
            if (!user) {
                throw new BadRequestException(`User with ID ${userId} not found`);
            }
            let mainCookbookId: number = user.mainCookbookId;
            if (!mainCookbookId) {
                throw new BadRequestException(`User with ID ${userId} missing mainCookbookId`);
            }
            return this.prisma.recipe.create({
                data: {
                    ...data,
                    user: {
                        connect: { id: userId },
                    },
                    cookbook: {
                        connect: data.cookbook?.connect ? [{ id: mainCookbookId }, ...data.cookbook.connect] : [{ id: mainCookbookId }],
                    },
                },
            });
        } 
        catch (error) {
            throw error;
        }
    }

    async duplicateRecipe(recipeId: number, newUserId: number): Promise<Recipe> {
        try {
            //get the original recipe without including related entities we don't want to copy
            const originalRecipe = await this.prisma.recipe.findUnique({
                where: { id: recipeId },
                select: {
                    name: true,
                    description: true,
                    directions: true,
                    ingredients: true,
                    prepTime: true,
                    cookTime: true,
                },
            });
            if (!originalRecipe) {
                throw new BadRequestException(`Recipe with ID ${recipeId} not found`);
            }
            //create the new `RecipeCreateInput` object without the unwanted fields
            const recipeData: RecipeCreateInput = {
                name: `${originalRecipe.name}-duplicate`,
                description: originalRecipe.description,
                directions: originalRecipe.directions,
                ingredients: { set: originalRecipe.ingredients },
                prepTime: originalRecipe.prepTime,
                cookTime: originalRecipe.cookTime,
                user: {
                    connect: { id: newUserId },
                },
            };
            //use the existing `createRecipe` method to create the new recipe
            return this.createRecipe(recipeData);
        } catch (error) {
            throw error;
        }
    } 
}
    

