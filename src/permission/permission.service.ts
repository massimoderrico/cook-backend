import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionCreateInput } from '../@generated/permission/permission-create.input';
import { PermissionLevel, ResourceType } from '@prisma/client';

@Injectable()
export class PermissionService {
    constructor(private readonly prisma: PrismaService) {}

    async createPermission(data: PermissionCreateInput) {
        try {
            if (!data.userId || !data.resourceId || !data.permissionLevel || !data.resourceType) {
                throw new BadRequestException(
                    'Resource ID, resource type, user ID and permission level are required fields for permission creation'
                );
            }
            //ensure user exists in database
            // Ensure the user exists
            const userExists = await this.prisma.user.findUnique({
                where: { id: data.userId },
            });
            if (!userExists) {
                throw new Error('User does not exist.');
            }
            //ensure permission doesn't already exist in database
            const existingPermission = await this.prisma.permission.findFirst({
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
}
