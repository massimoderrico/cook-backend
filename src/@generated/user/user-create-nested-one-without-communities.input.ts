import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateWithoutCommunitiesInput } from './user-create-without-communities.input';
import { Type } from 'class-transformer';
import { UserCreateOrConnectWithoutCommunitiesInput } from './user-create-or-connect-without-communities.input';
import { Prisma } from '@prisma/client';
import { UserWhereUniqueInput } from './user-where-unique.input';

@InputType()
export class UserCreateNestedOneWithoutCommunitiesInput {

    @Field(() => UserCreateWithoutCommunitiesInput, {nullable:true})
    @Type(() => UserCreateWithoutCommunitiesInput)
    create?: UserCreateWithoutCommunitiesInput;

    @Field(() => UserCreateOrConnectWithoutCommunitiesInput, {nullable:true})
    @Type(() => UserCreateOrConnectWithoutCommunitiesInput)
    connectOrCreate?: UserCreateOrConnectWithoutCommunitiesInput;

    @Field(() => UserWhereUniqueInput, {nullable:true})
    @Type(() => UserWhereUniqueInput)
    connect?: Prisma.AtLeast<UserWhereUniqueInput, 'id' | 'email' | 'username'>;
}
