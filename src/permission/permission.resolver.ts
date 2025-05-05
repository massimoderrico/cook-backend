import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionService } from './permission.service'
import { Permission } from '../@generated/permission/permission.model';
import { PermissionCreateInput } from '../@generated/permission/permission-create.input';
import { PermissionWhereInput } from '../@generated/permission/permission-where.input';
import { ResourceType } from '../@generated/prisma/resource-type.enum';
import { PermissionLevel } from '../@generated/prisma/permission-level.enum';

@Resolver()
export class PermissionResolver {
    constructor(private readonly permissionService: PermissionService) {}

    @Mutation(() => Permission)
    async createPermission(@Args('data') data: PermissionCreateInput,): Promise<Permission> {
        try {
            return await this.permissionService.createPermission(data);
        } catch (error) {
            throw new Error(`Failed to create permission: ${error.message}`);
        }
    }

    @Query(() => [Permission], { nullable: true })
    async getPermission(@Args('data') data: PermissionWhereInput,): Promise<Permission[]> {
        try {
            return await this.permissionService.getPermissions(data);
        } catch (error) {
            throw new Error(`Failed to get permissions: ${error.message}`);
        }
    }

    @Mutation(() => Permission)
    async deletePermission(@Args('data') data: PermissionWhereInput,) {
        try {
            return await this.permissionService.deletePermission(data);
        } catch (error) {
            throw new Error(`Failed to delete permission: ${error.message}`);
        }
    }

    @Mutation(() => Permission)
    async editPermission( 
        @Args('userId', { type: () => Int }) userId: string,
        @Args('resourceId', { type: () => Int }) resourceId: number,
        @Args('resourceType', { type: () => ResourceType }) resourceType: ResourceType,
        @Args('permissionLevel', { type: () => PermissionLevel }) permissionLevel: PermissionLevel,
    ): Promise<Permission> {
        try {
            return await this.permissionService.editPermission(userId, resourceId, resourceType, permissionLevel);
        } catch (error) {
            throw new Error(`Failed to edit permission: ${error.message}`);
        }
    }
}
