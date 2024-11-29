import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateInput } from '../@generated/user/user-create.input';
import { User } from 'src/@generated/user/user.model';
import { CookbookCreateInput } from 'src/@generated/cookbook/cookbook-create.input';
import { CookbookResolver } from 'src/cookbook/cookbook.resolver';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private resolver: CookbookResolver){}

    async createUser(data: UserCreateInput, ){
        try{
            if(!data.name) throw new BadRequestException("Name is required to create a user");
            
            if(!data.password) throw new BadRequestException("Password is required to create a user");
            
            if(!data.email) throw new BadRequestException("Email is required to create a user");
            
            const createdUser = this.prisma.user.create({
                    data:{
                        ...data
                    },
                });
            
            const userId = (await createdUser).id;

            const input: CookbookCreateInput = {
                name: 'All Recipes',
                description: 'Main cookbook containing all saved recipes',
                isMainCookbook: true,
                user: { connect: { id: userId } }, // Minimal user input
            };
            const createdCookbook = await this.resolver.createCookbook(input);
            
            const updatedUser = await this.prisma.user.update({
                where: {id: userId},
                data:{mainCookbookId: createdCookbook.id},
            });

            return updatedUser;
        }
        catch(error){
            throw(error.message);
        }
    }

    async deleteUser(id: number){
        try{
            return this.prisma.user.delete({where: {id: id}});
        }
        catch(error){
            throw(error.message);
        }
    }
}
