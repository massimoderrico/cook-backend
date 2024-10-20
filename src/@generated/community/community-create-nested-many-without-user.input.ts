import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommunityCreateWithoutUserInput } from './community-create-without-user.input';
import { Type } from 'class-transformer';
import { CommunityCreateOrConnectWithoutUserInput } from './community-create-or-connect-without-user.input';
import { CommunityCreateManyUserInputEnvelope } from './community-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';

@InputType()
export class CommunityCreateNestedManyWithoutUserInput {

    @Field(() => [CommunityCreateWithoutUserInput], {nullable:true})
    @Type(() => CommunityCreateWithoutUserInput)
    create?: Array<CommunityCreateWithoutUserInput>;

    @Field(() => [CommunityCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => CommunityCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<CommunityCreateOrConnectWithoutUserInput>;

    @Field(() => CommunityCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => CommunityCreateManyUserInputEnvelope)
    createMany?: CommunityCreateManyUserInputEnvelope;

    @Field(() => [CommunityWhereUniqueInput], {nullable:true})
    @Type(() => CommunityWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>>;
}
