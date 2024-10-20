import { registerEnumType } from '@nestjs/graphql';

export enum PermissionLevel {
    CREATOR = "CREATOR",
    EDITOR = "EDITOR",
    VIEWER = "VIEWER"
}


registerEnumType(PermissionLevel, { name: 'PermissionLevel', description: undefined })
