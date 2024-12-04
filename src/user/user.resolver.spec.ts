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
});
