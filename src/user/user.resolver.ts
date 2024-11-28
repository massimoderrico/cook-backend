// Example in a User Resolver
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '../@generated/user/user.model';
import { NotFoundException } from '@nestjs/common';
import { UserCreateInput } from 'src/@generated/user/user-create.input';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(@Args('data') user: UserCreateInput): Promise<User>{
    try { 
      return await this.userService.createUser(user);
    }
    catch (err) {
      throw new Error("Failed to create user: ${err.message}");
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
}
