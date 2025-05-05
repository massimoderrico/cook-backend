import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { EnumRoleFilter } from '../prisma/enum-role-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { IntNullableFilter } from '../prisma/int-nullable-filter.input';
import { RecipeListRelationFilter } from '../recipe/recipe-list-relation-filter.input';
import { Type } from 'class-transformer';
import { CookbookListRelationFilter } from '../cookbook/cookbook-list-relation-filter.input';
import { CommunityListRelationFilter } from '../community/community-list-relation-filter.input';
import { CommentListRelationFilter } from '../comment/comment-list-relation-filter.input';

@InputType()
export class UserWhereInput {

    @Field(() => [UserWhereInput], {nullable:true})
    AND?: Array<UserWhereInput>;

    @Field(() => [UserWhereInput], {nullable:true})
    OR?: Array<UserWhereInput>;

    @Field(() => [UserWhereInput], {nullable:true})
    NOT?: Array<UserWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    id?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    email?: StringFilter;

    @Field(() => StringFilter, {nullable:true})
    username?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    name?: StringNullableFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    image?: StringNullableFilter;

    @Field(() => EnumRoleFilter, {nullable:true})
    role?: EnumRoleFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;

    @Field(() => IntNullableFilter, {nullable:true})
    mainCookbookId?: IntNullableFilter;

    @Field(() => RecipeListRelationFilter, {nullable:true})
    @Type(() => RecipeListRelationFilter)
    recipes?: RecipeListRelationFilter;

    @Field(() => CookbookListRelationFilter, {nullable:true})
    @Type(() => CookbookListRelationFilter)
    cookbooks?: CookbookListRelationFilter;

    @Field(() => CommunityListRelationFilter, {nullable:true})
    @Type(() => CommunityListRelationFilter)
    communities?: CommunityListRelationFilter;

    @Field(() => CommentListRelationFilter, {nullable:true})
    @Type(() => CommentListRelationFilter)
    comments?: CommentListRelationFilter;
}
