import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { CommunityUncheckedCreateNestedManyWithoutCookbooksInput } from '../community/community-unchecked-create-nested-many-without-cookbooks.input';

@InputType()
export class CookbookUncheckedCreateWithoutRecipesInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Boolean, {nullable:true})
    isPublic?: boolean;

    @Field(() => Boolean, {nullable:true})
    isMainCookbook?: boolean;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => GraphQLDecimal, {nullable:true})
    @Type(() => Object)
    @Transform(transformToDecimal)
    rating?: Decimal;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => CommunityUncheckedCreateNestedManyWithoutCookbooksInput, {nullable:true})
    @Type(() => CommunityUncheckedCreateNestedManyWithoutCookbooksInput)
    communities?: CommunityUncheckedCreateNestedManyWithoutCookbooksInput;
}
