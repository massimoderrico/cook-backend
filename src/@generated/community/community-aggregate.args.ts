import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CommunityWhereInput } from './community-where.input';
import { Type } from 'class-transformer';
import { CommunityOrderByWithRelationInput } from './community-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CommunityCountAggregateInput } from './community-count-aggregate.input';
import { CommunityAvgAggregateInput } from './community-avg-aggregate.input';
import { CommunitySumAggregateInput } from './community-sum-aggregate.input';
import { CommunityMinAggregateInput } from './community-min-aggregate.input';
import { CommunityMaxAggregateInput } from './community-max-aggregate.input';

@ArgsType()
export class CommunityAggregateArgs {

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

    @Field(() => CommunityCountAggregateInput, {nullable:true})
    _count?: CommunityCountAggregateInput;

    @Field(() => CommunityAvgAggregateInput, {nullable:true})
    _avg?: CommunityAvgAggregateInput;

    @Field(() => CommunitySumAggregateInput, {nullable:true})
    _sum?: CommunitySumAggregateInput;

    @Field(() => CommunityMinAggregateInput, {nullable:true})
    _min?: CommunityMinAggregateInput;

    @Field(() => CommunityMaxAggregateInput, {nullable:true})
    _max?: CommunityMaxAggregateInput;
}
