import { registerEnumType } from '@nestjs/graphql';

export enum ResourceType {
    RECIPE = "RECIPE",
    COOKBOOK = "COOKBOOK",
    COMMUNITY = "COMMUNITY"
}


registerEnumType(ResourceType, { name: 'ResourceType', description: undefined })
