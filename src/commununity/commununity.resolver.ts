import { Args, Int, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CommununityService } from './commununity.service';
import { Community } from 'src/@generated/community/community.model';
import { CommunityCreateInput } from 'src/@generated/community/community-create.input';
import { CommunityUpdateInput } from 'src/@generated/community/community-update.input';

@Resolver()
export class CommununityResolver {
    constructor(private readonly communityService: CommununityService){}

    @Mutation(() => Community)
    async createCommunity(@Args('data') data: CommunityCreateInput): Promise<Community>{
        try {
            return await this.communityService.createCommunity(data);
        }
        catch (error) {
            throw new Error(`Failed to create community: ${error.message}`);
        }
    }
    
    @Mutation(() => Boolean)
    async deletecommunity(
        @Args('communityId', { type: () => Int }) communityId: number,
        @Args('userId', { type: () => Int }) userId: number,  
    ): Promise<boolean> {
        try {
            return await this.communityService.deleteCommunity(communityId, userId);
        }
        catch(error) {
            throw new Error(`Failed to delete community: ${error.message}`);
        }
    }

    //This could be replaced by a search communities by name/description
    @Query(() => Community, { nullable: true })
    async getCommunitybyname(@Args(`communityName`, { type: () => String}) communityName: string): Promise<Community>{
        try {
            return await this.communityService.getCommunityByName(communityName);
        }
        catch (error) {
            throw new Error(`Failed to get community with that name: ${error.message}`);
        }
    }
    
    @Query(() => [Community], { nullable: true })
    async getCommunityCookbooks(@Args(`id`, { type: () => Number}) communityId: number): Promise<Community[]>{
        try {
            return await this.communityService.getCommunityCookbooks(communityId);
        }
        catch (error) {
            throw new Error(`Failed to get cookbooks for community ID ${communityId}: ${error.message}.`);
        }
    }
}

