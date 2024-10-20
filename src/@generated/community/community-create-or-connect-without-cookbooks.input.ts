import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';
import { Type } from 'class-transformer';
import { CommunityCreateWithoutCookbooksInput } from './community-create-without-cookbooks.input';

@InputType()
export class CommunityCreateOrConnectWithoutCookbooksInput {

    @Field(() => CommunityWhereUniqueInput, {nullable:false})
    @Type(() => CommunityWhereUniqueInput)
    where!: Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>;

    @Field(() => CommunityCreateWithoutCookbooksInput, {nullable:false})
    @Type(() => CommunityCreateWithoutCookbooksInput)
    create!: CommunityCreateWithoutCookbooksInput;
}
