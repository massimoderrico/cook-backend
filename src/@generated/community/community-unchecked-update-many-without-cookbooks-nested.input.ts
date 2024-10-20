import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommunityCreateWithoutCookbooksInput } from './community-create-without-cookbooks.input';
import { Type } from 'class-transformer';
import { CommunityCreateOrConnectWithoutCookbooksInput } from './community-create-or-connect-without-cookbooks.input';
import { CommunityUpsertWithWhereUniqueWithoutCookbooksInput } from './community-upsert-with-where-unique-without-cookbooks.input';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';
import { CommunityUpdateWithWhereUniqueWithoutCookbooksInput } from './community-update-with-where-unique-without-cookbooks.input';
import { CommunityUpdateManyWithWhereWithoutCookbooksInput } from './community-update-many-with-where-without-cookbooks.input';
import { CommunityScalarWhereInput } from './community-scalar-where.input';

@InputType()
export class CommunityUncheckedUpdateManyWithoutCookbooksNestedInput {

    @Field(() => [CommunityCreateWithoutCookbooksInput], {nullable:true})
    @Type(() => CommunityCreateWithoutCookbooksInput)
    create?: Array<CommunityCreateWithoutCookbooksInput>;

    @Field(() => [CommunityCreateOrConnectWithoutCookbooksInput], {nullable:true})
    @Type(() => CommunityCreateOrConnectWithoutCookbooksInput)
    connectOrCreate?: Array<CommunityCreateOrConnectWithoutCookbooksInput>;

    @Field(() => [CommunityUpsertWithWhereUniqueWithoutCookbooksInput], {nullable:true})
    @Type(() => CommunityUpsertWithWhereUniqueWithoutCookbooksInput)
    upsert?: Array<CommunityUpsertWithWhereUniqueWithoutCookbooksInput>;

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

    @Field(() => [CommunityUpdateWithWhereUniqueWithoutCookbooksInput], {nullable:true})
    @Type(() => CommunityUpdateWithWhereUniqueWithoutCookbooksInput)
    update?: Array<CommunityUpdateWithWhereUniqueWithoutCookbooksInput>;

    @Field(() => [CommunityUpdateManyWithWhereWithoutCookbooksInput], {nullable:true})
    @Type(() => CommunityUpdateManyWithWhereWithoutCookbooksInput)
    updateMany?: Array<CommunityUpdateManyWithWhereWithoutCookbooksInput>;

    @Field(() => [CommunityScalarWhereInput], {nullable:true})
    @Type(() => CommunityScalarWhereInput)
    deleteMany?: Array<CommunityScalarWhereInput>;
}
