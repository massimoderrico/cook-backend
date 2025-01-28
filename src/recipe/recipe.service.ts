import { Cookbook, Recipe, User } from '@prisma/client';
import { RecipeCreateInput } from 'src/@generated/recipe/recipe-create.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { RecipeUpdateInput } from 'src/@generated/recipe/recipe-update.input';
import { RecipeUpdateManyMutationInput } from 'src/@generated/recipe/recipe-update-many-mutation.input';
import { Decimal } from '@prisma/client/runtime/library';


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

    async addRecipeToCookbook(cookbookIds: number[], recipeId: number): Promise<Recipe> {
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
                include: { cookbook: true, }
            })
            if (!recipe){
                throw new BadRequestException("Recipe does not exist")
            }            
            const cookbooks = await this.prisma.cookbook.findMany({
                where: {
                    id: { in: cookbookIds },
                },
            });
            const validCookbookIds = cookbooks.map( (c) => c.id)
            const connectCookbooks = validCookbookIds.map((id) => ({ id }))
            const data: RecipeUpdateInput = {
                cookbook : {
                    connect: connectCookbooks,
                }
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
                    image: true,
                },
            });
            if (!originalRecipe) {
                throw new BadRequestException(`Recipe with ID ${recipeId} not found`);
            }
            //create the new `RecipeCreateInput` object without the unwanted fields
            const recipeData: RecipeCreateInput = {
                name: `${originalRecipe.name}-duplicate`,
                description: originalRecipe.description,
                directions: { set: originalRecipe.directions },
                ingredients: { set: originalRecipe.ingredients },
                prepTime: originalRecipe.prepTime,
                cookTime: originalRecipe.cookTime,
                image: originalRecipe.image,
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

    async searchRecipes(query: string): Promise<Recipe[]> {
        try {
            // Validate the presence of a query
            if (!query) {
                throw new BadRequestException('Query is required');
            }
            // Return recipes that match the query
            return this.prisma.recipe.findMany({
                where: {
                    OR: [
                        // Search by name
                        { name: { contains: query, mode: 'insensitive' } },
                        // Search in description
                        { description: { contains: query, mode: 'insensitive' } },
                        // Search in ingredients
                        { ingredients: { hasSome: query.split(',').map(ingredient => ingredient.trim()) } },
                    ],
                },
            });
        } catch (error) {
          throw error;
        }
    }      

    async hpGetTopRecipes(skip: number, first: number): Promise<Recipe[]> {
        try {
            // Return top rated recipes
            return this.prisma.recipe.findMany({
                orderBy: {
                  rating: 'desc', // Sort recipes by rating in descending order
                },
                skip, // Number of items to skip
                take: first, // Number of items to fetch
            });
        } catch (error) {
            throw error;
        }
    }  
    
    async hpGetRecentRecipes(skip: number, first: number): Promise<Recipe[]> {
        try {
            // Return top rated recipes
            return this.prisma.recipe.findMany({
                orderBy: {
                  createdAt: 'desc', // Sort recipes by creation in descending order
                },
                skip, // Number of items to skip
                take: first, // Number of items to fetch
            });
        } catch (error) {
            throw error;
        }
    }    

    async updateRecipeRating (recipeId: number, rating: number): Promise<Recipe> {
        try {
            if (!recipeId) {
                throw new BadRequestException("Recipe ID is required to update recipe rating");
            }
            if (rating < 0 || rating > 5) {
                throw new BadRequestException("Rating must be between 0 and 5");
            }
            const existingRecipe = await this.prisma.recipe.findUnique({
                where: { id: recipeId},
                select: { rating: true, ratingsCount: true },
            })
            if (!existingRecipe) {
                throw new BadRequestException("Recipe does not exist");
            }
            const currentRating = existingRecipe.rating ? existingRecipe.rating : new Decimal(0);
            const updatedRatingsCount = existingRecipe.ratingsCount + 1;
            const newRating= new Decimal(
                (currentRating.toNumber() * existingRecipe.ratingsCount + rating) / updatedRatingsCount
            );
            return await this.prisma.recipe.update({
                where: { id: recipeId },
                data: {
                    rating: newRating,
                    ratingsCount: updatedRatingsCount,
                    updatedAt: new Date(),
                },
            })
        } catch (error) {
            throw error;
        }
    }
}
    

