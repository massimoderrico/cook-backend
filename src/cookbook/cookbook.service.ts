import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CookbookCreateInput } from '../@generated/cookbook/cookbook-create.input';

@Injectable()
export class CookbookService {
    constructor(private prisma: PrismaService) {}

    async createCookbook(data: CookbookCreateInput) {
        // Validate the presence of user
        if (!data.user) {
            throw new Error('User input is required for creating a cookbook.');
        }
        // Construct input data
        const cookbookData: Prisma.CookbookCreateInput = {
            ...data,
            user: {
                connect: data.user.connect ? { id: data.user.connect.id } : undefined,
                create: data.user.create || undefined,
                connectOrCreate: data.user.connectOrCreate || undefined,
            },
            recipes: data.recipes ? {
                create: data.recipes.create || undefined,
                connect: data.recipes.connect || undefined,
                connectOrCreate: data.recipes.connectOrCreate || undefined,
            } : undefined,
            communities: data.communities ? {
                create: data.communities.create || undefined,
                connect: data.communities.connect || undefined,
                connectOrCreate: data.communities.connectOrCreate || undefined,
            } : undefined,
        };
        // Create cookbook
        return this.prisma.cookbook.create({
            data: cookbookData,
        });
    }
}
