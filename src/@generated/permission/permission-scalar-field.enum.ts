import { registerEnumType } from '@nestjs/graphql';

export enum PermissionScalarFieldEnum {
    id = "id",
    permissionLevel = "permissionLevel",
    userId = "userId",
    resourceId = "resourceId",
    resourceType = "resourceType",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(PermissionScalarFieldEnum, { name: 'PermissionScalarFieldEnum', description: undefined })
