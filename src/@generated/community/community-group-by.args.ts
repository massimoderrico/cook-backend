import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CommunityWhereInput } from './community-where.input';
import { Type } from 'class-transformer';
import { CommunityOrderByWithAggregationInput } from './community-order-by-with-aggregation.input';
import { CommunityScalarFieldEnum } from './community-scalar-field.enum';
import { CommunityScalarWhereWithAggregatesInput } from './community-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { CommunityCountAggregateInput } from './community-count-aggregate.input';
import { CommunityAvgAggregateInput } from './community-avg-aggregate.input';
import { CommunitySumAggregateInput } from './community-sum-aggregate.input';
import { CommunityMinAggregateInput } from './community-min-aggregate.input';
import { CommunityMaxAggregateInput } from './community-max-aggregate.input';

@ArgsType()
export class CommunityGroupByArgs {

    @Field(() => CommunityWhereInput, {nullable:true})
    @Type(() => CommunityWhereInput)
    where?: CommunityWhereInput;

    @Field(() => [CommunityOrderByWithAggregationInput], {nullable:true})
    orderBy?: Array<CommunityOrderByWithAggregationInput>;

    @Field(() => [CommunityScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof CommunityScalarFieldEnum>;

    @Field(() => CommunityScalarWhereWithAggregatesInput, {nullable:true})
    having?: CommunityScalarWhereWithAggregatesInput;

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
