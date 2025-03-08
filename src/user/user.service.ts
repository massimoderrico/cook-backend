import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client'
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateInput } from '../@generated/user/user-create.input';
import { CookbookCreateInput } from 'src/@generated/cookbook/cookbook-create.input';
import { Cookbook } from 'src/@generated/cookbook/cookbook.model';
import { UserUpdateInput } from 'src/@generated/user/user-update.input';
import { CookbookService } from 'src/cookbook/cookbook.service';
import { Recipe } from 'src/@generated/recipe/recipe.model';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService, private cookbook: CookbookService){}

    async createUser(data: UserCreateInput){
        try{
            if(!data.username) throw new BadRequestException("Username is required to create a user");
            
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
                user: { connect: { id: userId } }, 
            };
            const createdCookbook = await this.cookbook.createCookbook(input);
            
            const updatedUser = await this.prisma.user.update({
                where: {id: userId},
                data:{mainCookbookId: createdCookbook.id},
            });

            return updatedUser;
        }
        catch(error){
            throw error;
        }
    }

    async getUserById(id: number): Promise<User> {
        try {
            const user: User = await this.prisma.user.findUnique({
                where: { id: id },
            });
            if (!user) {
                throw new BadRequestException(`User with ID ${id} does not exist`);
            }
            return user;
        }
        catch(error) {
            throw error;
        }
    }

    async changeNameUser(userid: number, data :string): Promise<User>{
        try{
            const existingUser: User = await this.prisma.user.findUnique({where: {id: userid}});
            if (!existingUser) {
                throw new BadRequestException(`User with ID ${userid} does not exist`);
            }
            return await this.prisma.user.update({
                where: {id: userid},
                data: {name: data}
            });
        }
        catch(error){
            throw error;
        }
    }

    async changeUserPassword(userid: number, password: string): Promise<User>{
        try{
            const existingUser = await this.prisma.user.findUnique({where: {id: userid}});
            if(!existingUser) {
                throw new BadRequestException(`User with ID ${userid} does not exist`);
            }
            return await this.prisma.user.update({
                where: {id: userid},
                data: {password: password}
            });
        }
        catch(error){
            throw error;
        }
    }

    async deleteUser(id: number){
        try{
            return this.prisma.user.delete({where: {id: id}});
        }
        catch(error){
            throw error;
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

    async getUserRecipes(userId: number): Promise<Recipe[]> {
        try {
            //validate presence of a user ID
            if (!userId) {
                throw new BadRequestException('User ID is required');
            }
            //get the user along with its cookbooks
            const user = await this.prisma.user.findUnique({
                where: { id: userId },
                include: { 
                    recipes: true,
                }, 
            });
            //handle case where the user does not exist
            if (!user) {
                throw new BadRequestException(`User with ID ${userId} does not exist`);
            }
            //return the cookbooks
            return user.recipes;
        } catch (error) {
            throw error;
        }
    }

    async searchUser(query: string): Promise<User[]> {
        try {
            //validate presence of a query
            if (!query) {
                throw new BadRequestException('Query is required');
            }
            //return users that match query
            return this.prisma.user.findMany({
                where: {
                  OR: [
                    //search by name
                    { name: { contains: query, mode: 'insensitive' } }, 
                    //search by username
                    { username: { contains: query, mode: 'insensitive' } },
                  ],
                },
            }); 
        } catch (error) {
            throw error;
        }
    }

    async changePictureUser(userId: number, image :string): Promise<User>{
        try{
            const existingUser: User = await this.prisma.user.findUnique({where: {id: userId}});
            if (!existingUser) {
                throw new BadRequestException(`User with ID ${userId} does not exist`);
            }
            return await this.prisma.user.update({
                where: {id: userId},
                data: {image: image}
            });
        }
        catch(error){
            throw error;
        }
    }
}
