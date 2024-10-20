import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutRecipesInput } from './user-create-without-recipes.input';

@InputType()
export class UserCreateOrConnectWithoutRecipesInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;

    @Field(() => UserCreateWithoutRecipesInput, {nullable:false})
    @Type(() => UserCreateWithoutRecipesInput)
    create!: UserCreateWithoutRecipesInput;
}
