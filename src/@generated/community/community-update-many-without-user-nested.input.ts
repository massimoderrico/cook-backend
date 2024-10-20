import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommunityCreateWithoutUserInput } from './community-create-without-user.input';
import { Type } from 'class-transformer';
import { CommunityCreateOrConnectWithoutUserInput } from './community-create-or-connect-without-user.input';
import { CommunityUpsertWithWhereUniqueWithoutUserInput } from './community-upsert-with-where-unique-without-user.input';
import { CommunityCreateManyUserInputEnvelope } from './community-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';
import { CommunityUpdateWithWhereUniqueWithoutUserInput } from './community-update-with-where-unique-without-user.input';
import { CommunityUpdateManyWithWhereWithoutUserInput } from './community-update-many-with-where-without-user.input';
import { CommunityScalarWhereInput } from './community-scalar-where.input';

@InputType()
export class CommunityUpdateManyWithoutUserNestedInput {

    @Field(() => [CommunityCreateWithoutUserInput], {nullable:true})
    @Type(() => CommunityCreateWithoutUserInput)
    create?: Array<CommunityCreateWithoutUserInput>;

    @Field(() => [CommunityCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => CommunityCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<CommunityCreateOrConnectWithoutUserInput>;

    @Field(() => [CommunityUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => CommunityUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<CommunityUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => CommunityCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => CommunityCreateManyUserInputEnvelope)
    createMany?: CommunityCreateManyUserInputEnvelope;

    @Field(() => [CommunityWhereUniqueInput], {nullable:true})
    @Type(() => CommunityWhereUniqueInput)
    set?: Array<Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>>;

    @Field(() => [CommunityWhereUniqueInput], {nullable:true})
    @Type(() => CommunityWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>>;

    @Field(() => [CommunityWhereUniqueInput], {nullable:true})
    @Type(() => CommunityWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>>;

    @Field(() => [CommunityWhereUniqueInput], {nullable:true})
    @Type(() => CommunityWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>>;

    @Field(() => [CommunityUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => CommunityUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<CommunityUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [CommunityUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => CommunityUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<CommunityUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [CommunityScalarWhereInput], {nullable:true})
    @Type(() => CommunityScalarWhereInput)
    deleteMany?: Array<CommunityScalarWhereInput>;
}
