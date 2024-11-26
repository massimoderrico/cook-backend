import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Permission, User } from '@prisma/client';
import { PermissionCreateInput } from '../@generated/permission/permission-create.input';
import { PermissionWhereInput } from '../@generated/permission/permission-where.input';

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
}
