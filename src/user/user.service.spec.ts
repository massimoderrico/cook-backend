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
              findMany: jest.fn(),
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
        image: null,
      };
      const mockCookbook: Cookbook = { 
        id: 1,
        name: 'All Recipes',
        description: 'Main cookbook containing all saved recipes',
        isPublic: true,
        isMainCookbook: true,
        userId: mockUser.id,
        rating: null,
        ratingsCount: 0,
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

  describe('getUserById', () => {
    it('should return a user if found', async () => {
      const mockUser: User = {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: 'hashed_password',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        mainCookbookId: 1,
        cookbooks: [],
        recipes: [],
        communities: [],
        comments: [],
        image: null,
      };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);
      const result = await service.getUserById(1);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockUser);
    });

    it('should throw a BadRequestException if the user does not exist', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(
        new BadRequestException('User with ID 1 does not exist'),
      );
      await expect(service.getUserById(1)).rejects.toThrow(
        'User with ID 1 does not exist',
      );
    });

    it('should throw an error if prisma throws an exception', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(
        new Error('Some internal error')
      );
      await expect(service.getUserById(1)).rejects.toThrow(
        'Some internal error',
      );
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
            ratingsCount: 0,
            createdAt: new Date(),
            updatedAt: new Date(),
            recipes: null,
            communities: null,
          },
        ],
        recipes: null,
        communities: null,
        image: null,
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

  describe('changeNameUser', () => {
    it('should change the user\'s name successfully', async () => {
      const userId = 1;
      const newName = 'New Name';
      const mockUser: User = {
        id: userId,
        name: 'Old Name',
        email: 'test@example.com',
        username: 'testuser',
        password: 'hashedpassword',
        mainCookbookId: null,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        image: null,
      };
      const updatedUser: User = { ...mockUser, name: newName };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);
      jest.spyOn(prisma.user, 'update').mockResolvedValue(updatedUser);
      const result = await service.changeNameUser(userId, newName);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: userId } });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { name: newName },
      });
      expect(result).toEqual(updatedUser);
    });

    it('should throw BadRequestException if user does not exist', async () => {
      const userId = 1;
      const newName = 'New Name';
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      await expect(service.changeNameUser(userId, newName)).rejects.toThrow(
        `User with ID 1 does not exist`
      );
    });

    it('should throw an error if prisma throws an exception', async () => {
      const userId = 1;
      const newName = 'New Name';
      jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Some internal error'));
      await expect(service.changeNameUser(userId, newName)).rejects.toThrow('Some internal error');
    });
  });

  describe('changeUserPassword', () => {
    it('should change the user\'s password successfully', async () => {
      const userId = 1;
      const newPassword = 'NewSecurePassword123';
      const mockUser: User = {
        id: userId,
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        password: 'OldPassword123',
        mainCookbookId: null,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        image: null,
      };
      const updatedUser: User = { ...mockUser, password: newPassword };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);
      jest.spyOn(prisma.user, 'update').mockResolvedValue(updatedUser);
      const result = await service.changeUserPassword(userId, newPassword);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: userId } });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { password: newPassword },
      });
      expect(result).toEqual(updatedUser);
    });
  
    it('should throw BadRequestException if user does not exist', async () => {
      const userId = 1;
      const newPassword = 'NewSecurePassword123';
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      await expect(service.changeUserPassword(userId, newPassword)).rejects.toThrow(
        `User with ID 1 does not exist`
      );
    });
  
    it('should throw an error if prisma throws an exception', async () => {
      const userId = 1;
      const newPassword = 'NewSecurePassword123';
      jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Some internal error'));
      await expect(service.changeUserPassword(userId, newPassword)).rejects.toThrow(
        'Some internal error'
      );
    });
  });

  describe('searchUser', () => {
    it('should return users that match the query', async () => {
      const mockUsers: User[] = [
        {
          id: 1,
          name: 'John Doe',
          username: 'johndoe',
          email: 'john@example.com',
          password: 'abc123',
          mainCookbookId: 1,
          role: 'USER',
          createdAt: new Date(),
          updatedAt: new Date(),
          image: null,
        },
      ];
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue(mockUsers);
      const result = await service.searchUser('john');
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { name: { contains: 'john', mode: 'insensitive' } },
            { username: { contains: 'john', mode: 'insensitive' } },
          ],
        },
      });
      expect(result).toEqual(mockUsers);
    });
  
    it('should throw a BadRequestException if query is empty', async () => {
      await expect(service.searchUser('')).rejects.toThrow(BadRequestException);
    });
  
    it('should throw an error if Prisma throws an exception', async () => {
      jest.spyOn(prisma.user, 'findMany').mockRejectedValue(new Error('Database error'));
      await expect(service.searchUser('john')).rejects.toThrow('Database error');
      expect(prisma.user.findMany).toHaveBeenCalledWith({
        where: {
          OR: [
            { name: { contains: 'john', mode: 'insensitive' } },
            { username: { contains: 'john', mode: 'insensitive' } },
          ],
        },
      });
    });
  });

  describe('changePictureUser', () => {
    it('should change the user\'s picture successfully', async () => {
      const userId = 1;
      const newImage = 'not null';
      const mockUser: User = {
        id: userId,
        name: 'Old Name',
        email: 'test@example.com',
        username: 'testuser',
        password: 'hashedpassword',
        mainCookbookId: null,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        image: "null",
      };
      const updatedUser: User = { ...mockUser, name: newImage };
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(mockUser);
      jest.spyOn(prisma.user, 'update').mockResolvedValue(updatedUser);
      const result = await service.changePictureUser(userId, newImage);
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: userId } });
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: userId },
        data: { image: newImage },
      });
      expect(result).toEqual(updatedUser);
    });

    it('should throw BadRequestException if user does not exist', async () => {
      const userId = 1;
      const newImage = 'mock';
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      await expect(service.changePictureUser(userId, newImage)).rejects.toThrow(
        `User with ID 1 does not exist`
      );
    });

    it('should throw an error if prisma throws an exception', async () => {
      const userId = 1;
      const newImage = 'mock';
      jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(new Error('Some internal error'));
      await expect(service.changePictureUser(userId, newImage)).rejects.toThrow('Some internal error');
    });
  });
});
