import { registerEnumType } from '@nestjs/graphql';

export enum CookbookScalarFieldEnum {
    id = "id",
    name = "name",
    description = "description",
    isPublic = "isPublic",
    isMainCookbook = "isMainCookbook",
    userId = "userId",
    rating = "rating",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(CookbookScalarFieldEnum, { name: 'CookbookScalarFieldEnum', description: undefined })
