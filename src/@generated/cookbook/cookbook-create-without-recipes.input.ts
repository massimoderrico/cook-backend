import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { Type } from 'class-transformer';
import { UserCreateNestedOneWithoutCookbooksInput } from '../user/user-create-nested-one-without-cookbooks.input';
import { CommunityCreateNestedManyWithoutCookbooksInput } from '../community/community-create-nested-many-without-cookbooks.input';

@InputType()
export class CookbookCreateWithoutRecipesInput {

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

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => UserCreateNestedOneWithoutCookbooksInput, {nullable:false})
    @Type(() => UserCreateNestedOneWithoutCookbooksInput)
    user!: UserCreateNestedOneWithoutCookbooksInput;

    @Field(() => CommunityCreateNestedManyWithoutCookbooksInput, {nullable:true})
    @Type(() => CommunityCreateNestedManyWithoutCookbooksInput)
    communities?: CommunityCreateNestedManyWithoutCookbooksInput;
}
