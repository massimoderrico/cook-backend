import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CommunityCountAggregate } from './community-count-aggregate.output';
import { CommunityAvgAggregate } from './community-avg-aggregate.output';
import { CommunitySumAggregate } from './community-sum-aggregate.output';
import { CommunityMinAggregate } from './community-min-aggregate.output';
import { CommunityMaxAggregate } from './community-max-aggregate.output';

@ObjectType()
export class CommunityGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => CommunityCountAggregate, {nullable:true})
    _count?: CommunityCountAggregate;

    @Field(() => CommunityAvgAggregate, {nullable:true})
    _avg?: CommunityAvgAggregate;

    @Field(() => CommunitySumAggregate, {nullable:true})
    _sum?: CommunitySumAggregate;

    @Field(() => CommunityMinAggregate, {nullable:true})
    _min?: CommunityMinAggregate;

    @Field(() => CommunityMaxAggregate, {nullable:true})
    _max?: CommunityMaxAggregate;
}
