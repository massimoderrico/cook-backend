import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { Cookbook } from '../@generated/cookbook/cookbook.model';
import { User } from '../@generated/user/user.model';
import { BadRequestException } from '@nestjs/common';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: {
            upsertOAuthUser: jest.fn(),
            getUserById: jest.fn(),
            getUserByEmail: jest.fn(),
            changeNameUser: jest.fn(),
            getUserCookbooks: jest.fn(),
            getUserRecipes: jest.fn(),
            searchUser: jest.fn(),
            changePictureUser: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('upsertOAuthUser', () => {
    it('should create or update a user successfully', async () => {
      const input = {
        email: 'test@example.com',
        name: 'Test User',
        username: 'testuser',
        image: 'test-image-url',
      };
      const mockUser: User = {
        id: '1',
        email: input.email,
        name: input.name,
        username: input.username,
        image: input.image,
        mainCookbookId: null,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(userService, 'upsertOAuthUser').mockResolvedValue(mockUser);
      const result = await resolver.upsertOAuthUser(
        input.email,
        input.name,
        input.username,
        input.image,
      );
      expect(userService.upsertOAuthUser).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if the service throws an exception', async () => {
      const input = {
        email: 'test@example.com',
        name: 'Test User',
        username: 'testuser',
        image: 'test-image-url',
      };
      jest.spyOn(userService, 'upsertOAuthUser').mockRejectedValue(new Error('Some error'));
      await expect(
        resolver.upsertOAuthUser(input.email, input.name, input.username, input.image),
      ).rejects.toThrow('Failed to upsert user: Some error');
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        username: 'johndoe',
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        mainCookbookId: null,
        image: null,
      };
      jest.spyOn(userService, 'getUserById').mockResolvedValue(mockUser);
      const result = await resolver.getUserById('1');
      expect(userService.getUserById).toHaveBeenCalledWith('1');
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if the user does not exist', async () => {
      jest.spyOn(userService, 'getUserById').mockRejectedValue(
        new BadRequestException('User with ID 1 does not exist'),
      );
      await expect(resolver.getUserById('1')).rejects.toThrow(
        'Failed to get user: User with ID 1 does not exist',
      );
    });
  });

  describe('getUserCookbooks', () => {
    it('should return user cookbooks with related data', async () => {
      const mockCookbooks: Cookbook[] = [
        {
          id: 1,
          name: 'Desserts',
          description: 'Sweet treats',
          isPublic: true,
          isMainCookbook: false,
          userId: '123',
          rating: null,
          ratingsCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipes: null,
          communities: null,
        },
      ];
      jest.spyOn(userService, 'getUserCookbooks').mockResolvedValue(mockCookbooks);
      const result = await resolver.getUserCookbooks('123');
      expect(userService.getUserCookbooks).toHaveBeenCalledWith('123');
      expect(result).toEqual(mockCookbooks);
    });

    it('should throw an error when the service throws an exception', async () => {
      jest.spyOn(userService, 'getUserCookbooks').mockRejectedValue(
        new Error('Some internal error'),
      );
      await expect(resolver.getUserCookbooks('123')).rejects.toThrow(
        'Failed to get cookbooks for user ID 123: Some internal error',
      );
    });
  });

  describe('changeNameUser', () => {
    it('should change the user\'s name successfully', async () => {
      const userId = '1';
      const newName = 'New Name';
      const mockUser: User = {
        id: userId,
        name: 'Old Name',
        email: 'test@example.com',
        username: 'testuser',
        mainCookbookId: null,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        image: null,
      };
      const updatedUser: User = { ...mockUser, name: newName };
      jest.spyOn(userService, 'changeNameUser').mockResolvedValue(updatedUser);
      const result = await resolver.changeNameUser(userId, newName);
      expect(userService.changeNameUser).toHaveBeenCalledWith(userId, newName);
      expect(result).toEqual(updatedUser);
    });

    it('should throw an error if the user does not exist', async () => {
      const userId = '1';
      const newName = 'New Name';
      jest.spyOn(userService, 'changeNameUser').mockRejectedValue(
        new BadRequestException(`User with ID ${userId} does not exist`),
      );
      await expect(resolver.changeNameUser(userId, newName)).rejects.toThrow(
        'Failed to change user\'s name: User with ID 1 does not exist',
      );
    });
  });

  describe('searchUser', () => {
    it('should return users that match the query', async () => {
      const mockUsers: User[] = [
        {
          id: '1',
          name: 'John Doe',
          username: 'johndoe',
          email: 'john@example.com',
          mainCookbookId: null,
          role: 'USER',
          createdAt: new Date(),
          updatedAt: new Date(),
          image: null,
        },
      ];
      jest.spyOn(userService, 'searchUser').mockResolvedValue(mockUsers);
      const result = await resolver.searchUser('john');
      expect(userService.searchUser).toHaveBeenCalledWith('john');
      expect(result).toEqual(mockUsers);
    });

    it('should throw an error when the service throws an exception', async () => {
      jest.spyOn(userService, 'searchUser').mockRejectedValue(new Error('Some internal error'));
      await expect(resolver.searchUser('test')).rejects.toThrow(
        'Failed to find any users matching test: Some internal error',
      );
    });
  });

  describe('changePictureUser', () => {
    it('should change the user\'s picture successfully', async () => {
      const userId = '1';
      const newImage = 'new-image-url';
      const mockUser: User = {
        id: userId,
        name: 'Old Name',
        email: 'test@example.com',
        username: 'testuser',
        mainCookbookId: null,
        role: 'USER',
        createdAt: new Date(),
        updatedAt: new Date(),
        image: 'old-image-url',
      };
      const updatedUser: User = { ...mockUser, image: newImage };
      jest.spyOn(userService, 'changePictureUser').mockResolvedValue(updatedUser);
      const result = await resolver.changePictureUser(userId, newImage);
      expect(userService.changePictureUser).toHaveBeenCalledWith(userId, newImage);
      expect(result).toEqual(updatedUser);
    });

    it('should throw an error if the user does not exist', async () => {
      const userId = '1';
      const newImage = 'new-image-url';
      jest.spyOn(userService, 'changePictureUser').mockRejectedValue(
        new BadRequestException(`User with ID ${userId} does not exist`),
      );
      await expect(resolver.changePictureUser(userId, newImage)).rejects.toThrow(
        'Failed to change user\'s picture: User with ID 1 does not exist',
      );
    });
  });
});