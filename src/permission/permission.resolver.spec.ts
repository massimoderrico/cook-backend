import { Test, TestingModule } from '@nestjs/testing';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';
import { Permission } from '../@generated/permission/permission.model';
import { PermissionCreateInput } from '../@generated/permission/permission-create.input';
import { PermissionLevel } from '../@generated/prisma/permission-level.enum';
import { ResourceType } from '../@generated/prisma/resource-type.enum';
import { PermissionWhereInput } from '../@generated/permission/permission-where.input';

describe('PermissionResolver', () => {
  let resolver: PermissionResolver;
  let service: PermissionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionResolver,
        {
          provide: PermissionService,
          useValue: {
            createPermission: jest.fn(), // Mock the service method
            getPermissions: jest.fn(),
            deletePermission: jest.fn(),
            editPermission: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<PermissionResolver>(PermissionResolver);
    service = module.get<PermissionService>(PermissionService);
  });

  it('resolver and service should be defined', () => {
    expect(resolver).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('createPermission', () => {
    it('should create a permission with valid input', async () => {
      // Arrange
      const mockPermission: Permission = {
        id: 1,
        permissionLevel: PermissionLevel.CREATOR,
        userId: 123,
        resourceId: 456,
        resourceType: ResourceType.COOKBOOK,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const input: PermissionCreateInput = {
        permissionLevel: PermissionLevel.CREATOR,
        userId: 123,
        resourceId: 456,
        resourceType: ResourceType.COOKBOOK,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      jest.spyOn(service, 'createPermission').mockResolvedValue(mockPermission);
      // Act
      const result = await resolver.createPermission(input);
      // Assert
      expect(service.createPermission).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockPermission);
    });

    it('should throw an error if service fails', async () => {
      // Arrange
      const input: PermissionCreateInput = {
        permissionLevel: PermissionLevel.CREATOR,
        userId: 123,
        resourceId: 456,
        resourceType: ResourceType.RECIPE,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      jest.spyOn(service, 'createPermission').mockRejectedValue(new Error('Service Error'));
      // Act & Assert
      await expect(resolver.createPermission(input)).rejects.toThrow(
        'Failed to create permission: Service Error',
      );
    });
  });

  describe('getPermission', () => {
    const mockInput: PermissionWhereInput = { userId: { equals: 123 } };
    const mockPermissions: Permission[] = [
      {
        id: 1,
        userId: 123,
        resourceId: 456,
        resourceType: ResourceType.RECIPE,
        permissionLevel: PermissionLevel.CREATOR,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    it('should return permissions based on input', async () => {
      jest.spyOn(service, 'getPermissions').mockResolvedValue(mockPermissions);
      const result = await resolver.getPermission(mockInput);
      expect(service.getPermissions).toHaveBeenCalledWith(mockInput);
      expect(result).toEqual(mockPermissions);
    });

    it('should throw an error if the service throws', async () => {
      jest.spyOn(service, 'getPermissions').mockRejectedValue(new Error('Service Error'));
      await expect(resolver.getPermission(mockInput)).rejects.toThrow('Failed to get permissions: Service Error');
    });
  });

  describe('deletePermission', () => {
    it('should throw an error if the service throws an error', async () => {
      const input = {
        userId: { equals: 123 },
        resourceId: { equals: 456 },
        resourceType: { equals: ResourceType.RECIPE },
      };
      jest.spyOn(service, 'deletePermission').mockRejectedValue(new Error('Service error'));
      await expect(resolver.deletePermission(input)).rejects.toThrow('Failed to delete permission: Service error');
    });
  
    it('should call the service and return the deleted permission', async () => {
      const input = {
        userId: { equals: 123 },
        resourceId: { equals: 456 },
        resourceType: { equals: ResourceType.RECIPE },
      };
      const mockPermission = {
        id: 1,
        userId: 123,
        resourceId: 456,
        resourceType: ResourceType.RECIPE,
        permissionLevel: PermissionLevel.CREATOR,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'deletePermission').mockResolvedValue(mockPermission);
      const result = await resolver.deletePermission(input);
      expect(service.deletePermission).toHaveBeenCalledWith(input);
      expect(result).toEqual(mockPermission);
    });
  });

  describe('editPermission', () => {
    it('should throw an error if the service throws an error', async () => {
      jest.spyOn(service, 'editPermission').mockRejectedValue(new Error('Service error'));
      await expect(
        resolver.editPermission(123, 456, ResourceType.RECIPE, PermissionLevel.CREATOR),
      ).rejects.toThrow('Failed to edit permission: Service error');
    });
  
    it('should call the service and return the updated permission', async () => {
      const updatedPermission = {
        id: 1,
        userId: 123,
        resourceId: 456,
        resourceType: ResourceType.RECIPE,
        permissionLevel: PermissionLevel.VIEWER,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(service, 'editPermission').mockResolvedValue(updatedPermission);
      const result = await resolver.editPermission(123, 456, ResourceType.RECIPE, PermissionLevel.VIEWER);
      expect(service.editPermission).toHaveBeenCalledWith(123, 456, ResourceType.RECIPE, PermissionLevel.VIEWER);
      expect(result).toEqual(updatedPermission);
    });
  });
});
