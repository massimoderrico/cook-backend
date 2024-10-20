import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCookbooksInput } from './user-create-without-cookbooks.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCookbooksInput } from './user-create-or-connect-without-cookbooks.input';
import { UserUpsertWithoutCookbooksInput } from './user-upsert-without-cookbooks.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { UserUpdateToOneWithWhereWithoutCookbooksInput } from './user-update-to-one-with-where-without-cookbooks.input';

@InputType()
export class UserUpdateOneRequiredWithoutCookbooksNestedInput {

    @Field(() => UserCreateWithoutCookbooksInput, {nullable:true})
    @Type(() => UserCreateWithoutCookbooksInput)
    create?: UserCreateWithoutCookbooksInput;

    @Field(() => UserCreateOrConnectWithoutCookbooksInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCookbooksInput)
    connectOrCreate?: UserCreateOrConnectWithoutCookbooksInput;

    @Field(() => UserUpsertWithoutCookbooksInput, {nullable:true})
    @Type(() => UserUpsertWithoutCookbooksInput)
    upsert?: UserUpsertWithoutCookbooksInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;

    @Field(() => UserUpdateToOneWithWhereWithoutCookbooksInput, {nullable:true})
    @Type(() => UserUpdateToOneWithWhereWithoutCookbooksInput)
    update?: UserUpdateToOneWithWhereWithoutCookbooksInput;
}
