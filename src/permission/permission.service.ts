import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Permission, User } from '@prisma/client';
import { PermissionCreateInput } from '../@generated/permission/permission-create.input';
import { PermissionWhereInput } from '../@generated/permission/permission-where.input';
import { ResourceType } from '../@generated/prisma/resource-type.enum';
import { PermissionLevel } from '../@generated/prisma/permission-level.enum';

@Injectable()
export class PermissionService {
    constructor(private readonly prisma: PrismaService) {}

    async createPermission(data: PermissionCreateInput): Promise<Permission> {
        try {
            if (!data.userId || !data.resourceId || !data.permissionLevel || !data.resourceType) {
                throw new BadRequestException(
                    'Resource ID, resource type, user ID and permission level are required fields for permission creation'
                );
            }
            //ensure user exists in database
            // Ensure the user exists
            const userExists: User = await this.prisma.user.findUnique({
                where: { id: data.userId },
            });
            if (!userExists) {
                throw new Error('User does not exist.');
            }
            //ensure permission doesn't already exist in database
            const existingPermission: Permission = await this.prisma.permission.findFirst({
                where: {
                    userId: data.userId,
                    resourceId: data.resourceId,
                    resourceType: data.resourceType,
                },
            });
            if (existingPermission) {
                throw new Error('Permission already exists. Use editPermission instead.');
            }
            //create permission in database
            return this.prisma.permission.create({ data });
        } catch (error) {
            throw error;
        }
    }

    async getPermissions(data: PermissionWhereInput): Promise<Permission[]> {
        try {
            //ensure at least user ID or resource ID is present
            if (!data.userId && !data.resourceId) {
                throw new BadRequestException(
                    'At least user ID or resource ID required to get permissions'
                );
            }
            //if user ID but no resource ID then return all users permissions
            else if (data.userId && !data.resourceId) {
                return await this.prisma.permission.findMany({
                    where: {
                        AND: [
                            { userId: data.userId },
                        ]
                    },
                });
            }
            //else if resource ID but no user ID then return all resource permissions
            else if (!data.userId && data.resourceId) {
                return await this.prisma.permission.findMany({
                    where: {
                        AND: [
                            { resourceId: data.resourceId },
                            { resourceType: data.resourceType },
                        ]
                    },
                });
            }
            //else return permission for specific user and resource
            else {
                const result: Permission = await this.prisma.permission.findFirst({
                    where: {
                      AND: [
                        { userId: data.userId },
                        { resourceId: data.resourceId },
                        { resourceType: data.resourceType },
                      ]
                    }
                  });
                  //wrap the result in an array
                  return result ? [result] : []
            }
        } catch (error) {
            throw error;
        }
    }

    async deletePermission(data: PermissionWhereInput) {
        try {
            //ensure user ID, resource ID and resource type are not null
            if (!data.userId || !data.resourceId || !data.resourceType) {
                throw new BadRequestException(
                    'user ID, resource ID, and resource type required to delete permission'
                );
            }
            //get permission to delete from database
            const permission: Permission = await this.prisma.permission.findFirst({
                where: {
                  AND: [
                    { userId: data.userId },
                    { resourceId: data.resourceId },
                    { resourceType: data.resourceType },
                  ]
                }
            });
            if (!permission) {
                throw new BadRequestException('Permission not found.');
            }
            //delete permission from database
            return this.prisma.permission.delete({
                where: { id: permission.id },
            });
        } catch (error) {
            throw error;
        }
    }

    async editPermission(userId: string, resourceId: number, resourceType: ResourceType, permissionLevel: PermissionLevel): Promise<Permission> {
        try {
            //ensure user ID, resource ID, resource type, and permission level are not null
            if (!userId || !resourceId || !resourceType || !permissionLevel) {
                throw new BadRequestException(
                    'user ID, resource ID, resource type, and permission level required to edit permission'
                );
            }
            //get permission to edit in database
            const permission: Permission = await this.prisma.permission.findFirst({
                where: {
                  AND: [
                    { userId: userId },
                    { resourceId: resourceId },
                    { resourceType: resourceType },
                  ]
                }
            });
            if (!permission) {
                throw new BadRequestException('Permission not found.');
            }
            //update permission level in database
            return this.prisma.permission.update({
                where: { id: permission.id },
                data: { permissionLevel: permissionLevel },
              });
        } catch (error) {
            throw error;
        }
    }
}
