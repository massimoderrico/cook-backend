import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { RecipeUncheckedCreateNestedManyWithoutCookbookInput } from '../recipe/recipe-unchecked-create-nested-many-without-cookbook.input';
import { CommunityUncheckedCreateNestedManyWithoutCookbooksInput } from '../community/community-unchecked-create-nested-many-without-cookbooks.input';

@InputType()
export class CookbookUncheckedCreateWithoutUserInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Boolean, {nullable:true})
    isPublic?: boolean;

    @Field(() => GraphQLDecimal, {nullable:true})
    @Type(() => Object)
    @Transform(transformToDecimal)
    rating?: Decimal;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => RecipeUncheckedCreateNestedManyWithoutCookbookInput, {nullable:true})
    @Type(() => RecipeUncheckedCreateNestedManyWithoutCookbookInput)
    recipes?: RecipeUncheckedCreateNestedManyWithoutCookbookInput;

    @Field(() => CommunityUncheckedCreateNestedManyWithoutCookbooksInput, {nullable:true})
    @Type(() => CommunityUncheckedCreateNestedManyWithoutCookbooksInput)
    communities?: CommunityUncheckedCreateNestedManyWithoutCookbooksInput;
}
