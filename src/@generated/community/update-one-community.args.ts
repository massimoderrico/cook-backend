import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CommunityUpdateInput } from './community-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';

@ArgsType()
export class UpdateOneCommunityArgs {

    @Field(() => CommunityUpdateInput, {nullable:false})
    @Type(() => CommunityUpdateInput)
    data!: CommunityUpdateInput;

    @Field(() => CommunityWhereUniqueInput, {nullable:false})
    @Type(() => CommunityWhereUniqueInput)
    where!: Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>;
}
