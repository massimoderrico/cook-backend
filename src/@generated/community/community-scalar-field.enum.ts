import { registerEnumType } from '@nestjs/graphql';

export enum CommunityScalarFieldEnum {
    id = "id",
    name = "name",
    description = "description",
    userId = "userId"
}


registerEnumType(CommunityScalarFieldEnum, { name: 'CommunityScalarFieldEnum', description: undefined })
