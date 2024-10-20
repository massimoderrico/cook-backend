import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';
import { Type } from 'class-transformer';
import { CommunityUpdateWithoutCookbooksInput } from './community-update-without-cookbooks.input';
import { CommunityCreateWithoutCookbooksInput } from './community-create-without-cookbooks.input';

@InputType()
export class CommunityUpsertWithWhereUniqueWithoutCookbooksInput {

    @Field(() => CommunityWhereUniqueInput, {nullable:false})
    @Type(() => CommunityWhereUniqueInput)
    where!: Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>;

    @Field(() => CommunityUpdateWithoutCookbooksInput, {nullable:false})
    @Type(() => CommunityUpdateWithoutCookbooksInput)
    update!: CommunityUpdateWithoutCookbooksInput;

    @Field(() => CommunityCreateWithoutCookbooksInput, {nullable:false})
    @Type(() => CommunityCreateWithoutCookbooksInput)
    create!: CommunityCreateWithoutCookbooksInput;
}
