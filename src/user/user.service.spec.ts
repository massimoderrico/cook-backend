import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
import { User } from 'src/@generated/user/user.model';
import { CookbookResolver } from 'src/cookbook/cookbook.resolver';

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
            },
          },
        },
        {
          provide: CookbookResolver,
          useValue: {}, // Mock CookbookResolver
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
