import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';
import { Type } from 'class-transformer';
import { CommunityUpdateWithoutUserInput } from './community-update-without-user.input';
import { CommunityCreateWithoutUserInput } from './community-create-without-user.input';

@InputType()
export class CommunityUpsertWithWhereUniqueWithoutUserInput {

    @Field(() => CommunityWhereUniqueInput, {nullable:false})
    @Type(() => CommunityWhereUniqueInput)
    where!: Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>;

    @Field(() => CommunityUpdateWithoutUserInput, {nullable:false})
    @Type(() => CommunityUpdateWithoutUserInput)
    update!: CommunityUpdateWithoutUserInput;

    @Field(() => CommunityCreateWithoutUserInput, {nullable:false})
    @Type(() => CommunityCreateWithoutUserInput)
    create!: CommunityCreateWithoutUserInput;
}
