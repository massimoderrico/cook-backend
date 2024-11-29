import { Test, TestingModule } from '@nestjs/testing';
import { CookbookResolver } from './cookbook.resolver';
import { CookbookService } from './cookbook.service';
import { CookbookCreateInput } from '../@generated/cookbook/cookbook-create.input';

describe('CookbookResolver', () => {
  let resolver: CookbookResolver;
  let service: CookbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CookbookResolver,
        {
          provide: CookbookService,
          useValue: {
            createCookbook: jest.fn(), // Mock the service methods
            deleteCookbook: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<CookbookResolver>(CookbookResolver);
    service = module.get<CookbookService>(CookbookService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createCookbook', () => {
    it('should create a cookbook with minimal input (name and user)', async () => {
      // Arrange
      const mockCookbook = {
        id: 1,
        name: 'Test Cookbook',
        description: null,
        isPublic: true,
        isMainCookbook: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 123,
        rating: null,
      };
      const input: CookbookCreateInput = {
        name: 'Test Cookbook',
        user: { connect: { id: 1 } }, // Minimal user input
      };
      jest.spyOn(service, 'createCookbook').mockResolvedValue(mockCookbook);

      // Act
      const result = await resolver.createCookbook(input);

      // Assert
      expect(service.createCookbook).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockCookbook);
    });

    it('should throw an error if service fails', async () => {
      const input = { name: 'Test Cookbook', user: {} } as any;
      jest.spyOn(service, 'createCookbook').mockRejectedValue(new Error('Service Error'));

      await expect(resolver.createCookbook(input)).rejects.toThrow('Failed to create cookbook: Service Error');
    });
  });

  describe('deleteCookbook', () => {
    it('should delete a cookbook with valid input', async () => {
      // Arrange
      const cookbookId = 1;
      const userId = 123;
      jest.spyOn(service, 'deleteCookbook').mockResolvedValue(true); // Mock service response

      // Act
      const result = await resolver.deleteCookbook(cookbookId, userId);

      // Assert
      expect(service.deleteCookbook).toHaveBeenCalledWith(cookbookId, userId);
      expect(result).toBe(true);
    });

    it('should throw an error if the service throws an error', async () => {
      // Arrange
      const cookbookId = 1;
      const userId = 123;
      jest.spyOn(service, 'deleteCookbook').mockRejectedValue(new Error('Service Error'));
  
      // Act & Assert
      await expect(resolver.deleteCookbook(cookbookId, userId)).rejects.toThrow(
        'Failed to delete cookbook: Service Error'
      );
    });
  });
});
