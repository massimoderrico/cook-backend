import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { RecipeWhereInput } from './recipe-where.input';
import { Type } from 'class-transformer';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { StringNullableListFilter } from '../prisma/string-nullable-list-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { DecimalNullableFilter } from '../prisma/decimal-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';
import { CookbookListRelationFilter } from '../cookbook/cookbook-list-relation-filter.input';
import { CommunityListRelationFilter } from '../community/community-list-relation-filter.input';

@InputType()
export class RecipeWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => [RecipeWhereInput], {nullable:true})
    @Type(() => RecipeWhereInput)
    AND?: Array<RecipeWhereInput>;

    @Field(() => [RecipeWhereInput], {nullable:true})
    @Type(() => RecipeWhereInput)
    OR?: Array<RecipeWhereInput>;

    @Field(() => [RecipeWhereInput], {nullable:true})
    @Type(() => RecipeWhereInput)
    NOT?: Array<RecipeWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    description?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    directions?: StringNullableFilter;

    @Field(() => StringNullableListFilter, {nullable:true})
    ingredients?: StringNullableListFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    prepTime?: IntNullableFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    cookTime?: IntNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    isPublic?: BoolFilter;

    @Field(() => IntFilter, {nullable:true})
    userId?: IntFilter;

    @Field(() => DecimalNullableFilter, {nullable:true})
    @Type(() => DecimalNullableFilter)
    rating?: DecimalNullableFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;

    @Field(() => UserRelationFilter, {nullable:true})
    @Type(() => UserRelationFilter)
    user?: UserRelationFilter;

    @Field(() => CookbookListRelationFilter, {nullable:true})
    @Type(() => CookbookListRelationFilter)
    cookbook?: CookbookListRelationFilter;

    @Field(() => CommunityListRelationFilter, {nullable:true})
    @Type(() => CommunityListRelationFilter)
    communities?: CommunityListRelationFilter;
}
