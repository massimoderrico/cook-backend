import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionService } from './permission.service';
import { Permission } from '../@generated/permission/permission.model';
import { PermissionCreateInput } from '../@generated/permission/permission-create.input';
import { PermissionLevel } from '../@generated/prisma/permission-level.enum';
import { ResourceType } from '../@generated/prisma/resource-type.enum';
import { PermissionWhereInput } from '../@generated/permission/permission-where.input';

describe('PermissionService', () => {
  let service: PermissionService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionService,
        {
          provide: PrismaService,
          useValue: {
            user: {
              findUnique: jest.fn(),
            },
            permission: {
              findFirst: jest.fn(),
              create: jest.fn(),
              findMany: jest.fn(),
              delete: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PermissionService>(PermissionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prisma).toBeDefined();
  });

  describe('createPermission', () => {
    const mockInput: PermissionCreateInput = {
      permissionLevel: PermissionLevel.CREATOR,
      userId: 123,
      resourceId: 456,
      resourceType: ResourceType.RECIPE,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const mockPermission: Permission = {
      id: 1,
      permissionLevel: PermissionLevel.CREATOR,
      userId: 123,
      resourceId: 456,
      resourceType: ResourceType.RECIPE,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    it('should create a permission if valid data is provided', async () => {
      // Arrange
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({ id: 123 } as any);
      jest.spyOn(prisma.permission, 'findFirst').mockResolvedValue(null);
      jest.spyOn(prisma.permission, 'create').mockResolvedValue(mockPermission);
      // Act
      const result = await service.createPermission(mockInput);
      // Assert
      expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: mockInput.userId } });
      expect(prisma.permission.findFirst).toHaveBeenCalledWith({
        where: {
          userId: mockInput.userId,
          resourceId: mockInput.resourceId,
          resourceType: mockInput.resourceType,
        },
      });
      expect(prisma.permission.create).toHaveBeenCalledWith({ data: mockInput });
      expect(result).toEqual(mockPermission);
    });

    it('should throw BadRequestException if required fields are missing', async () => {
      const invalidInput = { ...mockInput, userId: undefined };
      await expect(service.createPermission(invalidInput)).rejects.toThrow(
        new BadRequestException(
          'Resource ID, resource type, user ID and permission level are required fields for permission creation',
        ),
      );
    });

    it('should throw an error if the user does not exist', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
      await expect(service.createPermission(mockInput)).rejects.toThrow('User does not exist.');
    });

    it('should throw an error if the permission already exists', async () => {
      jest.spyOn(prisma.user, 'findUnique').mockResolvedValue({ id: 123 } as any);
      jest.spyOn(prisma.permission, 'findFirst').mockResolvedValue(mockPermission);
      await expect(service.createPermission(mockInput)).rejects.toThrow(
        'Permission already exists. Use editPermission instead.',
      );
    });

    it('should rethrow any unexpected errors', async () => {
      const mockError = new Error('Unexpected Error');
      jest.spyOn(prisma.user, 'findUnique').mockRejectedValue(mockError);
      await expect(service.createPermission(mockInput)).rejects.toThrow(mockError);
    });
  });

  describe('getPermissions', () => {
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

    it('should throw BadRequestException if neither userId nor resourceId is provided', async () => {
      const mockInput: PermissionWhereInput = {};
      await expect(service.getPermissions(mockInput)).rejects.toThrow(
        new BadRequestException('At least user ID or resource ID required to get permissions'),
      );
    });

    it('should return all user permissions if only userId is provided', async () => {
      const mockInput: PermissionWhereInput = { userId: { equals: 123 } };
      jest.spyOn(prisma.permission, 'findMany').mockResolvedValue(mockPermissions);
      const result = await service.getPermissions(mockInput);
      expect(prisma.permission.findMany).toHaveBeenCalledWith({
        where: { AND: [{ userId: { equals : mockInput.userId.equals } }] },
      });
      expect(result).toEqual(mockPermissions);
    });

    it('should return all resource permissions if only resourceId is provided', async () => {
      const mockInput: PermissionWhereInput = {
        resourceId: { equals: 456 },
        resourceType: { equals: ResourceType.RECIPE },
      };
      jest.spyOn(prisma.permission, 'findMany').mockResolvedValue(mockPermissions);
      const result = await service.getPermissions(mockInput);
      expect(prisma.permission.findMany).toHaveBeenCalledWith({
        where: {
          AND: [
            { resourceId: { equals: mockInput.resourceId.equals } },
            { resourceType: { equals: mockInput.resourceType.equals } },
          ],
        },
      });
      expect(result).toEqual(mockPermissions);
    });

    it('should return specific user and resource permission if both userId and resourceId are provided', async () => {
      const mockInput: PermissionWhereInput = {
        userId: { equals: 123 },
        resourceId: { equals: 456 },
        resourceType: { equals: ResourceType.RECIPE },
      };
      jest.spyOn(prisma.permission, 'findFirst').mockResolvedValue(mockPermissions[0]);
      const result = await service.getPermissions(mockInput);
      expect(prisma.permission.findFirst).toHaveBeenCalledWith({
        where: {
          AND: [
            { userId: { equals: mockInput.userId.equals } },
            { resourceId: { equals: mockInput.resourceId.equals } },
            { resourceType: { equals: mockInput.resourceType.equals } },
          ],
        },
      });
      expect(result).toEqual([mockPermissions[0]]);
    });

    it('should return an empty array if no permission is found for specific user and resource', async () => {
      const mockInput: PermissionWhereInput = {
        userId: { equals: 123 },
        resourceId: { equals: 456 },
        resourceType: { equals: ResourceType.RECIPE },
      };
      jest.spyOn(prisma.permission, 'findFirst').mockResolvedValue(null);
      const result = await service.getPermissions(mockInput);
      expect(result).toEqual([]);
    });
  });

  describe('deletePermissions', () => {
    it('should throw BadRequestException if userId, resourceId, or resourceType is missing', async () => {
      const mockInput: PermissionWhereInput = { userId: { equals: 123 } }; // Missing other required fields
      await expect(service.deletePermission(mockInput)).rejects.toThrow(
        new BadRequestException('user ID, resource ID, and resource type required to delete permission'),
      );
    });
  
    it('should throw BadRequestException if the permission does not exist', async () => {
      const mockInput: PermissionWhereInput = {
        userId: { equals: 123 },
        resourceId: { equals: 456 },
        resourceType: { equals: ResourceType.RECIPE },
      };
      jest.spyOn(prisma.permission, 'findFirst').mockResolvedValue(null);
      await expect(service.deletePermission(mockInput)).rejects.toThrow(
        new BadRequestException('Permission not found.'),
      );
    });
  
    it('should delete the permission and return it if it exists', async () => {
      const mockInput: PermissionWhereInput = {
        userId: { equals: 123 },
        resourceId: { equals: 456 },
        resourceType: { equals: ResourceType.RECIPE },
      };
      const mockPermission: Permission = {
        id: 1,
        userId: 123,
        resourceId: 456,
        resourceType: ResourceType.RECIPE,
        permissionLevel: PermissionLevel.CREATOR,
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      jest.spyOn(prisma.permission, 'findFirst').mockResolvedValue(mockPermission);
      jest.spyOn(prisma.permission, 'delete').mockResolvedValue(mockPermission);
      const result = await service.deletePermission(mockInput);
      expect(prisma.permission.findFirst).toHaveBeenCalledWith({
        where: {
          AND: [
            { userId: { equals: mockInput.userId.equals } },
            { resourceId: { equals: mockInput.resourceId.equals } },
            { resourceType: { equals: mockInput.resourceType.equals } },
          ],
        },
      });
      expect(prisma.permission.delete).toHaveBeenCalledWith({ where: { id: mockPermission.id } });
      expect(result).toEqual(mockPermission);
    });
  });
});
