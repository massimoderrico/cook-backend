import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { Type } from 'class-transformer';
import { CommentCountOrderByAggregateInput } from './comment-count-order-by-aggregate.input';
import { CommentAvgOrderByAggregateInput } from './comment-avg-order-by-aggregate.input';
import { CommentMaxOrderByAggregateInput } from './comment-max-order-by-aggregate.input';
import { CommentMinOrderByAggregateInput } from './comment-min-order-by-aggregate.input';
import { CommentSumOrderByAggregateInput } from './comment-sum-order-by-aggregate.input';

@InputType()
export class CommentOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    description?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    @Type(() => SortOrderInput)
    rating?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    userId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    resourceId?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    resourceType?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => CommentCountOrderByAggregateInput, {nullable:true})
    @Type(() => CommentCountOrderByAggregateInput)
    _count?: CommentCountOrderByAggregateInput;

    @Field(() => CommentAvgOrderByAggregateInput, {nullable:true})
    @Type(() => CommentAvgOrderByAggregateInput)
    _avg?: CommentAvgOrderByAggregateInput;

    @Field(() => CommentMaxOrderByAggregateInput, {nullable:true})
    @Type(() => CommentMaxOrderByAggregateInput)
    _max?: CommentMaxOrderByAggregateInput;

    @Field(() => CommentMinOrderByAggregateInput, {nullable:true})
    @Type(() => CommentMinOrderByAggregateInput)
    _min?: CommentMinOrderByAggregateInput;

    @Field(() => CommentSumOrderByAggregateInput, {nullable:true})
    @Type(() => CommentSumOrderByAggregateInput)
    _sum?: CommentSumOrderByAggregateInput;
}
