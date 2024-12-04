import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/@generated/user/user.model';
import { CookbookResolver } from 'src/cookbook/cookbook.resolver';
import { Cookbook } from 'src/@generated/cookbook/cookbook.model';

describe('UserService', () => {
  let service: UserService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
        {
          provide: CookbookResolver,
          useValue: {
            createCookbook: jest.fn(),
          }, // Mock CookbookResolver
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a user and return updated user', async () => {
      const input = {
        name: 'Test User',
        email: 'test@example.com',
        username: 'testuser',
        password: 'securepassword',
      };
      const mockUser: User = {
        id: 1,
        name: input.name,
        email: input.email,
        username: input.username,
        password: 'hashedpassword',
        mainCookbookId: null,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        cookbooks: null,
        recipes: null,
        communities: null,
      };
      const mockCookbook: Cookbook = { 
        id: 1,
        name: 'All Recipes',
        description: 'Main cookbook containing all saved recipes',
        isPublic: true,
        isMainCookbook: true,
        userId: mockUser.id,
        rating: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        recipes: null,
        communities: null, 
      };
      const updatedUser: User = { ...mockUser, mainCookbookId: mockCookbook.id };
      jest.spyOn(prisma.user, 'create').mockResolvedValue(mockUser);
      jest.spyOn(prisma.user, 'update').mockResolvedValue(updatedUser);
      jest.spyOn(service['resolver'], 'createCookbook').mockResolvedValue(mockCookbook);
      const result = await service.createUser(input);
      expect(prisma.user.create).toHaveBeenCalledWith({
        data: input,
      });
      expect(service['resolver'].createCookbook).toHaveBeenCalledWith({
        name: 'All Recipes',
        description: 'Main cookbook containing all saved recipes',
        isMainCookbook: true,
        user: { connect: { id: mockUser.id } },
      });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: mockUser.id },
        data: { mainCookbookId: mockCookbook.id },
      });
      expect(result).toEqual(updatedUser);
    });
  });

  describe('getUserCookbooks', () => {
    it('should throw BadRequestException if userId is not provided', async () => {
      await expect(service.getUserCookbooks(null)).rejects.toThrow(
        new BadRequestException('User ID is required'),
      );
    });

    it('should throw BadRequestException if the user does not exist', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      await expect(service.getUserCookbooks(123)).rejects.toThrow(
        new BadRequestException('User with ID 123 does not exist'),
      );
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 123 },
        include: {
          cookbooks: {
            include: {
              recipes: true,
              communities: true,
            },
          },
        },
      });
    });

    it('should return the user\'s cookbooks with related data', async () => {
      const mockUser: User = {
        id: 123,
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'john_doe',
        password: 'hashed_password',
        mainCookbookId: 1,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        cookbooks: [
          {
            id: 1,
            name: 'Desserts',
            description: 'Sweet treats',
            isPublic: true,
            isMainCookbook: false,
            userId: 123,
            rating: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            recipes: null,
            communities: null,
          },
        ],
        recipes: null,
        communities: null,
      };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);
      const result = await service.getUserCookbooks(123);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({
        where: { id: 123 },
        include: {
          cookbooks: {
            include: {
              recipes: true,
              communities: true,
            },
          },
        },
      });
      expect(result).toEqual(mockUser.cookbooks);
    });
  });
});
