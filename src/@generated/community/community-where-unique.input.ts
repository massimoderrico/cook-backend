import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CommunityWhereInput } from './community-where.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { Type } from 'class-transformer';
import { RecipeListRelationFilter } from '../recipe/recipe-list-relation-filter.input';
import { CookbookListRelationFilter } from '../cookbook/cookbook-list-relation-filter.input';

@InputType()
export class CommunityWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => [CommunityWhereInput], {nullable:true})
    AND?: Array<CommunityWhereInput>;

    @Field(() => [CommunityWhereInput], {nullable:true})
    OR?: Array<CommunityWhereInput>;

    @Field(() => [CommunityWhereInput], {nullable:true})
    NOT?: Array<CommunityWhereInput>;

    @Field(() => StringNullableFilter, {nullable:true})
    description?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    userId?: IntFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    @Type(() => UserRelationFilter)
    user?: UserRelationFilter;

    @Field(() => RecipeListRelationFilter, {nullable:true})
    @Type(() => RecipeListRelationFilter)
    recipes?: RecipeListRelationFilter;

    @Field(() => CookbookListRelationFilter, {nullable:true})
    @Type(() => CookbookListRelationFilter)
    cookbooks?: CookbookListRelationFilter;
}
