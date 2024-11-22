import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cookbook } from '@prisma/client';
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
}
