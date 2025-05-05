import { registerEnumType } from '@nestjs/graphql';

export enum UserScalarFieldEnum {
    id = "id",
    email = "email",
    username = "username",
    name = "name",
    image = "image",
    role = "role",
    createdAt = "createdAt",
    updatedAt = "updatedAt",
    mainCookbookId = "mainCookbookId"
}


registerEnumType(UserScalarFieldEnum, { name: 'UserScalarFieldEnum', description: undefined })
