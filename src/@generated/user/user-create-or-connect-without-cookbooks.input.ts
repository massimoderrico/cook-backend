import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCookbooksInput } from './user-create-without-cookbooks.input';

@InputType()
export class UserCreateOrConnectWithoutCookbooksInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;

    @Field(() => UserCreateWithoutCookbooksInput, {nullable:false})
    @Type(() => UserCreateWithoutCookbooksInput)
    create!: UserCreateWithoutCookbooksInput;
}
