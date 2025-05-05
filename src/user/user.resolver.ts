import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { User } from '../@generated/user/user.model';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { UserCreateInput } from 'src/@generated/user/user-create.input';
import { UserService } from './user.service';
import { Cookbook } from 'src/@generated/cookbook/cookbook.model';
import { Recipe } from 'src/@generated/recipe/recipe.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  /**
   * Create or update a user based on OAuth login.
   */
  @Mutation(() => User)
  async upsertOAuthUser(
    @Args('email', { type: () => String }) email: string,
    @Args('name', { type: () => String }) name: string,
    @Args('username', { type: () => String, nullable: true }) username?: string,
    @Args('image', { type: () => String, nullable: true }) image?: string,
  ): Promise<User> {
    try {
      return await this.userService.upsertOAuthUser({ email, name, username, image });
    } catch (err) {
      throw new Error(`Failed to upsert user: ${err.message}`);
    }
  }

  /**
   * Get a user by ID.
   */
  @Query(() => User, { nullable: true })
  async getUserById(@Args('id', { type: () => String }) id: string): Promise<User> {
    try {
      return await this.userService.getUserById(id);
    } catch (error) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
  }

  /**
   * Get a user by email.
   */
  @Query(() => User, { nullable: true })
  async getUserByEmail(@Args('email', { type: () => String }) email: string): Promise<User> {
    try {
      return await this.userService.getUserByEmail(email);
    } catch (error) {
      throw new Error(`Failed to get user by email: ${error.message}`);
    }
  }

  /**
   * Change a user's name.
   */
  @Mutation(() => User)
  async changeNameUser(
    @Args('id', { type: () => String }) id: string,
    @Args('newName', { type: () => String }) newName: string,
  ): Promise<User> {
    try {
      return await this.userService.changeNameUser(id, newName);
    } catch (error) {
      throw new Error(`Failed to change user's name: ${error.message}`);
    }
  }

  /**
   * Get a user's cookbooks.
   */
  @Query(() => [Cookbook], { nullable: true })
  async getUserCookbooks(@Args('userId', { type: () => String }) userId: string): Promise<Cookbook[]> {
    try {
      return await this.userService.getUserCookbooks(userId);
    } catch (error) {
      throw new Error(`Failed to get cookbooks for user ID ${userId}: ${error.message}`);
    }
  }

  /**
   * Get a user's recipes.
   */
  @Query(() => [Recipe], { nullable: true })
  async getUserRecipes(@Args('userId', { type: () => String }) userId: string): Promise<Recipe[]> {
    try {
      return await this.userService.getUserRecipes(userId);
    } catch (error) {
      throw new Error(`Failed to get recipes for user ID ${userId}: ${error.message}`);
    }
  }

  /**
   * Search for users by name or username.
   */
  @Query(() => [User], { nullable: true })
  async searchUser(@Args('query', { type: () => String }) query: string): Promise<User[]> {
    try {
      return await this.userService.searchUser(query);
    } catch (error) {
      throw new Error(`Failed to find any users matching ${query}: ${error.message}`);
    }
  }

  /**
   * Change a user's profile picture.
   */
  @Mutation(() => User)
  async changePictureUser(
    @Args('id', { type: () => String }) id: string,
    @Args('image', { type: () => String }) image: string,
  ): Promise<User> {
    try {
      return await this.userService.changePictureUser(id, image);
    } catch (error) {
      throw new Error(`Failed to change user's picture: ${error.message}`);
    }
  }

  // /**
  //  * Delete a user by ID.
  //  */
  // @Mutation(() => User, { nullable: true })
  // async deleteUser(@Args('id', { type: () => String }) id: string): Promise<User> {
  //   try {
  //     return await this.userService.deleteUser(id);
  //   } catch (error) {
  //     if (error.code === 'P2025') {
  //       throw new NotFoundException(`User with id ${id} does not exist`);
  //     }
  //     throw new Error(`An unexpected error occurred while deleting the user: ${error.message}`);
  //   }
  // }
}