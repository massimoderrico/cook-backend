import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutCookbooksInput } from '../user/user-create-nested-one-without-cookbooks.input';
import { RecipeCreateNestedManyWithoutCookbookInput } from '../recipe/recipe-create-nested-many-without-cookbook.input';
import { CommunityCreateNestedManyWithoutCookbooksInput } from '../community/community-create-nested-many-without-cookbooks.input';

@InputType()
export class CookbookCreateInput {

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Boolean, {nullable:true})
    isPublic?: boolean;

    @Field(() => Boolean, {nullable:true})
    isMainCookbook?: boolean;

    @Field(() => GraphQLDecimal, {nullable:true})
    @Type(() => Object)
    @Transform(transformToDecimal)
    rating?: Decimal;

    @Field(() => Int, {nullable:true})
    ratingsCount?: number;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => UserCreateNestedOneWithoutCookbooksInput, {nullable:false})
    @Type(() => UserCreateNestedOneWithoutCookbooksInput)
    user!: UserCreateNestedOneWithoutCookbooksInput;

    @Field(() => RecipeCreateNestedManyWithoutCookbookInput, {nullable:true})
    @Type(() => RecipeCreateNestedManyWithoutCookbookInput)
    recipes?: RecipeCreateNestedManyWithoutCookbookInput;

    @Field(() => CommunityCreateNestedManyWithoutCookbooksInput, {nullable:true})
    @Type(() => CommunityCreateNestedManyWithoutCookbooksInput)
    communities?: CommunityCreateNestedManyWithoutCookbooksInput;
}
