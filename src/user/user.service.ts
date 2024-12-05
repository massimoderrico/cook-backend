import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateInput } from '../@generated/user/user-create.input';
import { CookbookCreateInput } from 'src/@generated/cookbook/cookbook-create.input';
import { CookbookResolver } from 'src/cookbook/cookbook.resolver';
import { Cookbook } from 'src/@generated/cookbook/cookbook.model';
import { UserUpdateInput } from 'src/@generated/user/user-update.input';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private resolver: CookbookResolver){}

    async createUser(data: UserCreateInput){
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

    async getUserById(id: number): Promise<User> {
        try{
            return await this.prisma.user.findUnique({
                where: {id: id},
            });
        }
        catch(error) {
            throw(error.message);
        }
    }

    async changeNameUser(userid: number, data :string): Promise<User>{
        try{

            const existingUser = await this.prisma.user.findUnique({where: {id: userid}});

            if (!existingUser) {
                throw new BadRequestException(`Cookbook with ID ${userid} does not exist`);
            }
            return await this.prisma.user.update({
                where: {id: userid},
                data: {name: data}
            });
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

    async getUserCookbooks(userId: number): Promise<Cookbook[]> {
        try {
            //validate presence of a user ID
            if (!userId) {
                throw new BadRequestException('User ID is required');
            }
            //get the user along with its cookbooks
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                include: { 
                    cookbooks: {
                        include: {
                            recipes: true, //include recipes for each cookbook
                            communities: true,
                        },
                    },
                }, //include the related cookbooks
            });
            //handle case where the user does not exist
            if (!user) {
                throw new BadRequestException(`User with ID ${userId} does not exist`);
            }
            //return the cookbooks
            return user.cookbooks;
        } catch (error) {
            throw error;
        }
    }   
}
