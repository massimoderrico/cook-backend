import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommunityCreateWithoutCookbooksInput } from './community-create-without-cookbooks.input';
import { Type } from 'class-transformer';
import { CommunityCreateOrConnectWithoutCookbooksInput } from './community-create-or-connect-without-cookbooks.input';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';

@InputType()
export class CommunityCreateNestedManyWithoutCookbooksInput {

    @Field(() => [CommunityCreateWithoutCookbooksInput], {nullable:true})
    @Type(() => CommunityCreateWithoutCookbooksInput)
    create?: Array<CommunityCreateWithoutCookbooksInput>;

    @Field(() => [CommunityCreateOrConnectWithoutCookbooksInput], {nullable:true})
    @Type(() => CommunityCreateOrConnectWithoutCookbooksInput)
    connectOrCreate?: Array<CommunityCreateOrConnectWithoutCookbooksInput>;

    @Field(() => [CommunityWhereUniqueInput], {nullable:true})
    @Type(() => CommunityWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>>;
}
