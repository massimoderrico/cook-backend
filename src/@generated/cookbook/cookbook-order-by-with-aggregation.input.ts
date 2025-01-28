import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { Type } from 'class-transformer';
import { CookbookCountOrderByAggregateInput } from './cookbook-count-order-by-aggregate.input';
import { CookbookAvgOrderByAggregateInput } from './cookbook-avg-order-by-aggregate.input';
import { CookbookMaxOrderByAggregateInput } from './cookbook-max-order-by-aggregate.input';
import { CookbookMinOrderByAggregateInput } from './cookbook-min-order-by-aggregate.input';
import { CookbookSumOrderByAggregateInput } from './cookbook-sum-order-by-aggregate.input';

@InputType()
export class CookbookOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    description?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    isPublic?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    isMainCookbook?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    userId?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    @Type(() => SortOrderInput)
    rating?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    ratingsCount?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => CookbookCountOrderByAggregateInput, {nullable:true})
    @Type(() => CookbookCountOrderByAggregateInput)
    _count?: CookbookCountOrderByAggregateInput;

    @Field(() => CookbookAvgOrderByAggregateInput, {nullable:true})
    @Type(() => CookbookAvgOrderByAggregateInput)
    _avg?: CookbookAvgOrderByAggregateInput;

    @Field(() => CookbookMaxOrderByAggregateInput, {nullable:true})
    @Type(() => CookbookMaxOrderByAggregateInput)
    _max?: CookbookMaxOrderByAggregateInput;

    @Field(() => CookbookMinOrderByAggregateInput, {nullable:true})
    @Type(() => CookbookMinOrderByAggregateInput)
    _min?: CookbookMinOrderByAggregateInput;

    @Field(() => CookbookSumOrderByAggregateInput, {nullable:true})
    @Type(() => CookbookSumOrderByAggregateInput)
    _sum?: CookbookSumOrderByAggregateInput;
}
