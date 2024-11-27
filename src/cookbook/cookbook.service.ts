import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cookbook, Recipe } from '@prisma/client';
import { CookbookCreateInput } from '../@generated/cookbook/cookbook-create.input';

@Injectable()
export class CookbookService {
    constructor(private prisma: PrismaService) {}

    async createCookbook(data: CookbookCreateInput): Promise<Cookbook> {
        try {
            //validate presence of cookbook name
            if (!data.name) {
                throw new BadRequestException('Cookbook name is required for creation');
            }
            let userId: number = data.user.connect.id
            //ensure user exists in database
            await this.prisma.user.findUnique({where: {id: userId}})
            //create cookbook in database
            return this.prisma.cookbook.create({
                data: {
                    ...data,
                    user: {
                        connect: { id: userId },
                    },
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async getCookbooksByIds(ids: number[]): Promise<Cookbook[]> {
        try {
            //validate input
            if (!ids || ids.length === 0) {
                throw new BadRequestException('Array of cookbook IDs must not be empty');
            }
            //get cookbooks from the database
            return await this.prisma.cookbook.findMany({
                where: {
                    id: { in: ids },
                },
            });
        } catch (error) {
            throw error;
        }
    }   
    
    async getRecipesByCookbookId(cookbookId: number): Promise<Recipe[]> {
        try {
            //validate presence of a cookbook ID
            if (!cookbookId) {
                throw new BadRequestException('Cookbook ID is required');
            }
            //get the cookbook along with its recipes
            const cookbook = await this.prisma.cookbook.findUnique({
                where: { id: cookbookId },
                include: { recipes: true }, //include the related recipes
            });
            //handle case where the cookbook does not exist
            if (!cookbook) {
                throw new BadRequestException(`Cookbook with ID ${cookbookId} does not exist`);
            }
            //return the recipes
            return cookbook.recipes;
        } catch (error) {
            throw error;
        }
    }    

    async deleteCookbook(cookbookId: number, userId: number): Promise<boolean> {
        try {
            if (!cookbookId || !userId) {
                throw new BadRequestException('Cookbook ID and User ID are required to delete a cookbook.');
            }
      
            //get the cookbook and validate ownership
            const cookbook = await this.prisma.cookbook.findUnique({
                where: { id: cookbookId },
                select: { userId: true },
            });
            if (!cookbook) {
                throw new BadRequestException(`Cookbook with ID ${cookbookId} does not exist.`);
            }
            if (cookbook.userId !== userId) {
                throw new BadRequestException('User does not have permission to delete this cookbook.');
            }
            //delete cookbook from database
            await this.prisma.cookbook.delete({
                where: { id: cookbookId },
            });
            //succesfully deleted
            return true;
        } catch (error) {
            throw error;
        }
    }
}
