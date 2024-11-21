import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Cookbook} from '@prisma/client';
import { CookbookCreateInput } from '../@generated/cookbook/cookbook-create.input';

@Injectable()
export class CookbookService {
    constructor(private prisma: PrismaService) {}

    async createCookbook(data: CookbookCreateInput): Promise<Cookbook> {
        try {
            //validate presence of cookb ook name
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
}
