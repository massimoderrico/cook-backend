import { registerEnumType } from '@nestjs/graphql';

export enum RecipeScalarFieldEnum {
    id = "id",
    name = "name",
    description = "description",
    directions = "directions",
    ingredients = "ingredients",
    prepTime = "prepTime",
    cookTime = "cookTime",
    isPublic = "isPublic",
    userId = "userId",
    cookbookId = "cookbookId",
    rating = "rating",
    createdAt = "createdAt",
    updatedAt = "updatedAt"
}


registerEnumType(RecipeScalarFieldEnum, { name: 'RecipeScalarFieldEnum', description: undefined })
