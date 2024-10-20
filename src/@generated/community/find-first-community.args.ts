import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CommunityWhereInput } from './community-where.input';
import { Type } from 'class-transformer';
import { CommunityOrderByWithRelationInput } from './community-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CommunityScalarFieldEnum } from './community-scalar-field.enum';

@ArgsType()
export class FindFirstCommunityArgs {

    @Field(() => CommunityWhereInput, {nullable:true})
    @Type(() => CommunityWhereInput)
    where?: CommunityWhereInput;

    @Field(() => [CommunityOrderByWithRelationInput], {nullable:true})
    orderBy?: Array<CommunityOrderByWithRelationInput>;

    @Field(() => CommunityWhereUniqueInput, {nullable:true})
    cursor?: Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [CommunityScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof CommunityScalarFieldEnum>;
}
