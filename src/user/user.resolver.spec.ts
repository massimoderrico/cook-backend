import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { BadRequestException } from '@nestjs/common';
import { Cookbook } from '../@generated/cookbook/cookbook.model';

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
