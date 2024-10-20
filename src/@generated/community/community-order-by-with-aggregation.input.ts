import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { CommunityCountOrderByAggregateInput } from './community-count-order-by-aggregate.input';
import { CommunityAvgOrderByAggregateInput } from './community-avg-order-by-aggregate.input';
import { CommunityMaxOrderByAggregateInput } from './community-max-order-by-aggregate.input';
import { CommunityMinOrderByAggregateInput } from './community-min-order-by-aggregate.input';
import { CommunitySumOrderByAggregateInput } from './community-sum-order-by-aggregate.input';

@InputType()
export class CommunityOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    description?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    userId?: keyof typeof SortOrder;

    @Field(() => CommunityCountOrderByAggregateInput, {nullable:true})
    _count?: CommunityCountOrderByAggregateInput;

    @Field(() => CommunityAvgOrderByAggregateInput, {nullable:true})
    _avg?: CommunityAvgOrderByAggregateInput;

    @Field(() => CommunityMaxOrderByAggregateInput, {nullable:true})
    _max?: CommunityMaxOrderByAggregateInput;

    @Field(() => CommunityMinOrderByAggregateInput, {nullable:true})
    _min?: CommunityMinOrderByAggregateInput;

    @Field(() => CommunitySumOrderByAggregateInput, {nullable:true})
    _sum?: CommunitySumOrderByAggregateInput;
}
