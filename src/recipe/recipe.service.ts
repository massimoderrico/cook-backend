import { Cookbook, Recipe, User } from '@prisma/client';
import { RecipeCreateInput } from 'src/@generated/recipe/recipe-create.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RecipeUpdateInput } from 'src/@generated/recipe/recipe-update.input';
import { RecipeUpdateManyMutationInput } from 'src/@generated/recipe/recipe-update-many-mutation.input';


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

    async deleteRecipe(recipeId: number, userId: number): Promise<boolean> {
        try {
            if (!recipeId || !userId) {
                throw new BadRequestException('Recipe ID and User ID are required to delete a recipe.');
            }
            //get the recipe and validate ownership
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
            //delete recipe from database
            await this.prisma.recipe.delete({
                where: { id: recipeId },
            });
            //succesfully deleted
            return true;
        } catch (error) {
            throw error;
        }
    }

    async editRecipe (recipeId: number, data: RecipeUpdateManyMutationInput): Promise<Recipe> {
        try {
            if (!recipeId) {
                throw new BadRequestException("Recipe ID is required to edit recipe");
            }

            const existingRecipe = await this.prisma.recipe.findUnique({
                where: { id: recipeId}
            })
            if (!existingRecipe) {
                throw new BadRequestException("Recipe does not exist");
            }

            return await this.prisma.recipe.update({
                where: { id: recipeId },
                data
            })
        } catch (error) {
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
            
            const cookbooks = await this.prisma.cookbook.findMany({
                where: {
                    id: { in: cookbookIds },
                },
                
            });

            const validCookbookIds = cookbooks.map( (c) => c.id)
            const connectCookbooks = validCookbookIds.map((id) => ({ id }))

            data.cookbook = {
                connect: connectCookbooks,
                ...(data.cookbook || {})
            }

            const updatedRecipe = await this.prisma.recipe.update({ 
                where: {
                    id: recipeId,
                },
                data,
                include: {
                    cookbook: true,
                }
            })

            await Promise.all(
                validCookbookIds.map((id)=>
                    this.prisma.cookbook.update({
                        where: { id: id },
                        data: {
                            recipes:{
                                connect: { id: recipeId },
                            }
                        }
                    })
                )
            )

            return updatedRecipe
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
    

