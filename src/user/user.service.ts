import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateInput } from '../@generated/user/user-create.input';
import { CookbookCreateInput } from 'src/@generated/cookbook/cookbook-create.input';
import { Cookbook } from 'src/@generated/cookbook/cookbook.model';
import { Recipe } from 'src/@generated/recipe/recipe.model';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  /**
   * Create or update a user based on OAuth login.
   * This method is used for Google, Microsoft, Apple, and Facebook logins.
   */
  async upsertOAuthUser(oauthData: {
    email: string;
    name: string;
    username?: string;
    image?: string;
  }): Promise<User> {
    try {
      const { email, name, username, image } = oauthData;

      if (!email) {
        throw new BadRequestException('Email is required for OAuth login');
      }

      // Upsert the user (create if not exists, update if exists)
      const user = await this.prisma.user.upsert({
        where: { email },
        update: {
          name,
          username: username || email.split('@')[0], // Default username if not provided
          image,
        },
        create: {
          email,
          name,
          username: username || email.split('@')[0],
          image,
        },
      });

      // Ensure the user has a main cookbook
      if (!user.mainCookbookId) {
        const mainCookbook = await this.createMainCookbook(user.id);
        await this.prisma.user.update({
          where: { id: user.id },
          data: { mainCookbookId: mainCookbook.id },
        });
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Create a main cookbook for a user.
   */
  private async createMainCookbook(userId: string): Promise<Cookbook> {
    const input: CookbookCreateInput = {
      name: 'All Recipes',
      description: 'Main cookbook containing all saved recipes',
      isMainCookbook: true,
      user: { connect: { id: userId } },
    };

    return this.prisma.cookbook.create({ data: input });
  }

  /**
   * Get a user by ID.
   */
  async getUserById(id: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      if (!user) {
        throw new BadRequestException(`User with ID ${id} does not exist`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a user by email.
   */
  async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
      });
      if (!user) {
        throw new BadRequestException(`User with email ${email} does not exist`);
      }
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Change a user's name.
   */
  async changeNameUser(userId: string, newName: string): Promise<User> {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!existingUser) {
        throw new BadRequestException(`User with ID ${userId} does not exist`);
      }
      return this.prisma.user.update({
        where: { id: userId },
        data: { name: newName },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a user's cookbooks.
   */
  async getUserCookbooks(userId: string): Promise<Cookbook[]> {
    try {
      if (!userId) {
        throw new BadRequestException('User ID is required');
      }
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: {
          cookbooks: {
            include: {
              recipes: true,
              communities: true,
            },
          },
        },
      });
      if (!user) {
        throw new BadRequestException(`User with ID ${userId} does not exist`);
      }
      return user.cookbooks;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get a user's recipes.
   */
  async getUserRecipes(userId: string): Promise<Recipe[]> {
    try {
      if (!userId) {
        throw new BadRequestException('User ID is required');
      }
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { recipes: true },
      });
      if (!user) {
        throw new BadRequestException(`User with ID ${userId} does not exist`);
      }
      return user.recipes;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Search for users by name or username.
   */
  async searchUser(query: string): Promise<User[]> {
    try {
      if (!query) {
        throw new BadRequestException('Query is required');
      }
      return this.prisma.user.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { username: { contains: query, mode: 'insensitive' } },
          ],
        },
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * Change a user's profile picture.
   */
  async changePictureUser(userId: string, image: string): Promise<User> {
    try {
      const existingUser = await this.prisma.user.findUnique({ where: { id: userId } });
      if (!existingUser) {
        throw new BadRequestException(`User with ID ${userId} does not exist`);
      }
      return this.prisma.user.update({
        where: { id: userId },
        data: { image },
      });
    } catch (error) {
      throw error;
    }
  }
}