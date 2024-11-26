import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PermissionService } from './permission.service'
import { Permission } from '../@generated/permission/permission.model';
import { PermissionCreateInput } from '../@generated/permission/permission-create.input';
import { PermissionWhereInput } from '../@generated/permission/permission-where.input';

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
}
