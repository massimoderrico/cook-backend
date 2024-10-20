import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCookbooksInput } from './user-create-without-cookbooks.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCookbooksInput } from './user-create-or-connect-without-cookbooks.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutCookbooksInput {

    @Field(() => UserCreateWithoutCookbooksInput, {nullable:true})
    @Type(() => UserCreateWithoutCookbooksInput)
    create?: UserCreateWithoutCookbooksInput;

    @Field(() => UserCreateOrConnectWithoutCookbooksInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCookbooksInput)
    connectOrCreate?: UserCreateOrConnectWithoutCookbooksInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}
