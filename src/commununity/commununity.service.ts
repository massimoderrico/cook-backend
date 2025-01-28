import { BadRequestException, Injectable } from '@nestjs/common';
import { Community, Cookbook, User } from '@prisma/client';
import { error } from 'console';
import { CommunityCreateInput } from 'src/@generated/community/community-create.input';
import { RecipeUpdateInput } from 'src/@generated/recipe/recipe-update.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommununityService {
    constructor(private prisma: PrismaService){}

    async createCommunity(data: CommunityCreateInput): Promise<Community> {
        try{
            if(!data.name){
                throw new BadRequestException('Community name is required');
            }
            if(!data.user){
                throw new BadRequestException('Community user (owner) is required');
            }
            let userId: number = data.user.connect.id;
            let user: User = await this.prisma.user.findUnique({where: {id: userId}});
            if(!user){
                throw new BadRequestException(`User with ID ${userId} not found`);
            }
            return this.prisma.community.create({
                data:{
                    ...data,
                    user: {
                        connect: {id: userId}
                    },
                },
            });
        }
        catch(error){
            throw error;
        }
    }

    async deleteCommunity (communityId:number, userId: number): Promise<boolean>{
        try{
            if(!communityId || !userId){
                throw new BadRequestException("Recipe ID and User ID are required to delete a community");
            }

            const community = await this.prisma.community.findUnique({
                where: {id: communityId},
                select: {userId: true},
            });

            if (!community){
                throw new BadRequestException(`No community with ID ${communityId} is found`);
            }
            if (community.userId !== userId){
                throw new BadRequestException("User does not have permission to delete this community");
            }
            await this.prisma.community.delete({
                where: {id: communityId},
            });
            
            return true;
        }
        catch(error){
            throw error;
        }
    }

    async getCommunityByName(name: string): Promise<Community> {
        try {
            const community: Community = await this.prisma.community.findUnique({
                where: {name: name},
            });
            if(!community){
                throw new BadRequestException (`Community with name ${name} does not exist`);
            }
            return community;
        }
        catch(error){
            throw error;
        }
    }

    async getCommunityCookbooks(name: string): Promise<Cookbook[]>{
        try{
            if(!name){
                throw new BadRequestException(`Community name is required`);
            }

            const community = await this.prisma.community.findUnique({
                where: {name: name},
                include:{
                    cookbooks:{
                        include: {
                            communities: true
                        }
                    }
                }
            });
            if(!community){
                throw new BadRequestException (`Community with name ${name} does not exist`);
            }
            return community.cookbooks;
        }
        catch(error){
            throw error;
        }
    }
/*
VERY UNCLEAR HOW THE THINGS WORK FROM HERE ON OUT... THERES NO LIST OF USERS IN A COMMUNITY? THERES A LIST OF RECIPES? WASNT SURE WHAT/HOW TO WRITE THE FUNCTIONS
*/
    async addRecipeToCommunity(data: RecipeUpdateInput, communityId: number, recipeId: number){
        try{
            const recipe = await this.prisma.recipe.findUnique({
                where: {id: recipeId},
            });

            if (!recipe) {
                throw new BadRequestException("Recipe not found");
            }

            const community = await this.prisma.community.findUnique({
                where: {id: communityId},
            });

            if (!community) {
                throw new BadRequestException("Community not found");
            }
            
            await this.prisma.community.update({
                where: {id: recipeId},
                data,
            });
        }
        catch(error){
            throw error;
        }
    }
}
