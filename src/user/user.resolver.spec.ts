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
            getUserCookbooks: jest.fn(),
            createUser: jest.fn(),
            getUserById: jest.fn(),
            changeNameUser: jest.fn(),
            changeUserPassword: jest.fn(),
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

  describe('createUser', () => {
    it('should create a user successfully', async () => {
      const input = {
        name: 'Test User',
        email: 'test@example.com',
        username: 'testuser',
        password: 'securepassword',
      };
      const mockUser: User = {
        id: 1,
        name: 'Test User',
        email: 'test@example.com',
        username: 'testuser',
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
      jest.spyOn(userService, 'createUser').mockResolvedValue(mockUser);
      const result = await resolver.createUser(input);
      expect(userService.createUser).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if user creation fails', async () => {
      const input = {
        name: 'Test User',
        email: 'test@example.com',
        username: 'testuser',
        password: 'securepassword',
      };
      jest.spyOn(userService, 'createUser').mockRejectedValue(new Error('Some error'));
      await expect(resolver.createUser(input)).rejects.toThrow(
        'Failed to create user: Some error',
      );
    });
  });

  describe('getUserById', () => {
    it('should return a user by ID', async () => {
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
      jest.spyOn(userService, 'getUserById').mockResolvedValue(mockUser);
      const result = await resolver.getUserById(1);
      expect(userService.getUserById).toHaveBeenCalledWith(1);
      expect(result).toEqual(mockUser);
    });

    it('should throw an error if the user does not exist', async () => {
      jest.spyOn(userService, 'getUserById').mockRejectedValue(
        new BadRequestException('User with ID 1 does not exist')
      );
      await expect(resolver.getUserById(1)).rejects.toThrow(
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
          userId: 123,
          rating: null,
          ratingsCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          recipes: null,
          communities: null,
        },
      ];
      jest.spyOn(userService, 'getUserCookbooks').mockResolvedValue(mockCookbooks);
      const result = await resolver.getUserCookbooks(123);
      expect(userService.getUserCookbooks).toHaveBeenCalledWith(123);
      expect(result).toEqual(mockCookbooks);
    });

    it('should throw an error when the service throws an exception', async () => {
      jest.spyOn(userService, 'getUserCookbooks').mockRejectedValue(
        new Error('Some internal error'),
      );
      await expect(resolver.getUserCookbooks(123)).rejects.toThrow(
        'Failed to get cookbooks for user ID 123: Some internal error',
      );
      expect(userService.getUserCookbooks).toHaveBeenCalledWith(123);
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
      jest.spyOn(userService, 'changeNameUser').mockResolvedValue(updatedUser);
      const result = await resolver.changeNameUser(userId, newName);
      expect(userService.changeNameUser).toHaveBeenCalledWith(userId, newName);
      expect(result).toEqual(updatedUser);
    });

    it('should throw an error if the user does not exist', async () => {
      const userId = 1;
      const newName = 'New Name';
      jest.spyOn(userService, 'changeNameUser').mockRejectedValue(
        new BadRequestException(`User with ID ${userId} does not exist`),
      );
      await expect(resolver.changeNameUser(userId, newName)).rejects.toThrow(
        'Failed to change user\'s name: User with ID 1 does not exist',
      );
    });

    it('should throw an error if there is an internal error', async () => {
      const userId = 1;
      const newName = 'New Name';
      jest.spyOn(userService, 'changeNameUser').mockRejectedValue(new Error('Some internal error'));
      await expect(resolver.changeNameUser(userId, newName)).rejects.toThrow(
        'Failed to change user\'s name: Some internal error',
      );
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
      jest.spyOn(userService, 'changeUserPassword').mockResolvedValue(updatedUser);
      const result = await resolver.changeUserPassword(userId, newPassword);
      expect(userService.changeUserPassword).toHaveBeenCalledWith(userId, newPassword);
      expect(result).toEqual(updatedUser);
    });
  
    it('should throw an error if the user does not exist', async () => {
      const userId = 1;
      const newPassword = 'NewSecurePassword123';
      jest.spyOn(userService, 'changeUserPassword').mockRejectedValue(
        new BadRequestException(`User with ID 1 does not exist`)
      );
      await expect(resolver.changeUserPassword(userId, newPassword)).rejects.toThrow(
        'Failed to change user\'s password: User with ID 1 does not exist'
      );
    });
  
    it('should throw an error if the service throws an exception', async () => {
      const userId = 1;
      const newPassword = 'NewSecurePassword123';
      jest.spyOn(userService, 'changeUserPassword').mockRejectedValue(
        new Error('Some internal error')
      );
      await expect(resolver.changeUserPassword(userId, newPassword)).rejects.toThrow(
        'Failed to change user\'s password: Some internal error'
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
      expect(userService.searchUser).toHaveBeenCalledWith('test');
    });
  });

  describe('changePictureUser', () => {
    it('should change the user\'s picture successfully', async () => {
      const userId = 1;
      const newImage = "not null";
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
      const updatedUser: User = { ...mockUser, image: newImage };
      jest.spyOn(userService, 'changePictureUser').mockResolvedValue(updatedUser);
      const result = await resolver.changePictureUser(userId, newImage);
      expect(userService.changePictureUser).toHaveBeenCalledWith(userId, newImage);
      expect(result).toEqual(updatedUser);
    });

    it('should throw an error if the user does not exist', async () => {
      const userId = 1;
      const newImage = 'mock';
      jest.spyOn(userService, 'changePictureUser').mockRejectedValue(
        new BadRequestException(`User with ID ${userId} does not exist`),
      );
      await expect(resolver.changePictureUser(userId, newImage)).rejects.toThrow(
        'Failed to change user\'s picture: User with ID 1 does not exist',
      );
    });

    it('should throw an error if there is an internal error', async () => {
      const userId = 1;
      const newImage = 'mock';
      jest.spyOn(userService, 'changePictureUser').mockRejectedValue(new Error('Some internal error'));
      await expect(resolver.changePictureUser(userId, newImage)).rejects.toThrow(
        'Failed to change user\'s picture: Some internal error',
      );
    });
  });
});
