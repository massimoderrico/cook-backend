// Example in a User Resolver
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from '../@generated/user/user.model';
import { NotFoundException } from '@nestjs/common';
import { UserCreateInput } from 'src/@generated/user/user-create.input';
import { UserService } from './user.service';
import { Cookbook } from 'src/@generated/cookbook/cookbook.model';
import { UserUpdateInput } from 'src/@generated/user/user-update.input';
import { Recipe } from 'src/@generated/recipe/recipe.model';

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
  async getUserById(@Args('id', { type: () => Int }) id: number): Promise<User> {
    try {
      return await this.userService.getUserById(id);
    }
    catch(error){
      throw new Error(`Failed to get user: ${error.message}`);
    }
  }

  @Query(() => Number, { nullable: true })
  async getUserIdByEmail(@Args('email', { type: () => String }) email: string): Promise<Number> {
    try {
      return await this.userService.getUserIdByEmail(email);
    }
    catch(error){
      throw new Error(`Failed to get user id: ${error.message}`);
    }
  }

  @Mutation(() => User)
  async changeNameUser(
    @Args('id', { type: () => Number }) id: number,
    @Args('data', {type: () => String}) data: string
  ): Promise<User> {
    try{
      return await this.userService.changeNameUser(id, data);
    }
    catch(error){
      throw new Error(`Failed to change user's name: ${error.message}`);
    }
  }

  @Mutation(() => User)
  async changeUserPassword(
    @Args('id', { type: () => Number}) id: number,     
    @Args('password', {type: () => String}) password: string
  ): Promise<User> {
    try{
      return await this.userService.changeUserPassword(id, password);
    }
    catch(error){
      throw new Error(`Failed to change user's password: ${error.message}`);
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

  @Query(() => [Recipe], { nullable: true })
  async getUserRecipes(@Args('userId', { type: () => Number }) userId: number): Promise<Recipe[]> {
    try {
      return await this.userService.getUserRecipes(userId);
    } catch (error) {
      throw new Error(`Failed to get recipes for user ID ${userId}: ${error.message}`);
    }
  }

  @Query(() => [User], { nullable: true })
  async searchUser(@Args('query', { type: () => String }) query: string): Promise<User[]> {
    try {
      return await this.userService.searchUser(query);
    } catch (error) {
      throw new Error(`Failed to find any users matching ${query}: ${error.message}`);
    }
  }

  @Mutation(() => User)
  async changePictureUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('image', {type: () => String}) image: string
  ): Promise<User> {
    try{
      return await this.userService.changePictureUser(id, image);
    }
    catch(error){
      throw new Error(`Failed to change user's picture: ${error.message}`);
    }
  }
}
