import { BadRequestException, Injectable } from '@nestjs/common';
import { Community, Recipe, User } from '@prisma/client';
import { CommunityCreateInput } from 'src/@generated/community/community-create.input';
import { CommunityUpdateInput } from 'src/@generated/community/community-update.input';
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

    async addRecipeToCommunity(communityId: number, recipeId: number){
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
            
            await this.prisma.recipe.update({
                where: {id: recipeId},
                data: {
                    community: {
                        connect: {id: communityId},
                    }
                }
            });

        }
        catch(error){
            throw error;
        }
    } 
}
