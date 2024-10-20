import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCommunitiesInput } from './user-create-without-communities.input';

@InputType()
export class UserCreateOrConnectWithoutCommunitiesInput {

    @Field(() => UserWhereUniqueInput, {nullable:false})
    @Type(() => UserWhereUniqueInput)
    where!: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;

    @Field(() => UserCreateWithoutCommunitiesInput, {nullable:false})
    @Type(() => UserCreateWithoutCommunitiesInput)
    create!: UserCreateWithoutCommunitiesInput;
}
