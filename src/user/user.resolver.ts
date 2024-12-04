// Example in a User Resolver
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { User } from '../@generated/user/user.model';
import { NotFoundException } from '@nestjs/common';
import { UserCreateInput } from 'src/@generated/user/user-create.input';
import { UserService } from './user.service';
import { Cookbook } from 'src/@generated/cookbook/cookbook.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('user') user: UserCreateInput): Promise<User>{
    try { 
      return await this.userService.createUser(user);
    }
    catch (err) {
      throw new Error(`Failed to create user: ${err.message}`);
    }
  }

  @Query(() => User, { nullable: true })
  async getUserById(@Args('id', { type: () => Number }) id: number): Promise<User> {
    try {
      return await this.userService.getUserById(id);
    }
    catch(error){
      throw new Error(`Failed to get user: ${error.message}`);
    }
  }

  @Mutation(() => User, { nullable: true })
  async deleteUser(@Args('id', { type: () => Number }) id: number): Promise<User> {
    try {
      // Attempt to delete the user
      return await this.userService.deleteUser(id);
    } catch (error) {
      // Handle the "record not found" error from Prisma
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with id ${id} does not exist`);
      }  
      // Rethrow any unexpected errors
      throw new Error('An unexpected error occurred while deleting the user');
    }
  }

  @Query(() => [Cookbook], { nullable: true })
  async getUserCookbooks(@Args('userId', { type: () => Number }) userId: number): Promise<Cookbook[]> {
    try {
      return await this.userService.getUserCookbooks(userId);
    } catch (error) {
      throw new Error(`Failed to get cookbooks for user ID ${userId}: ${error.message}`);
    }
  }
}
