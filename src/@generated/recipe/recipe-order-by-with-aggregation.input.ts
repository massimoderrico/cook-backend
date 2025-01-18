import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { Type } from 'class-transformer';
import { RecipeCountOrderByAggregateInput } from './recipe-count-order-by-aggregate.input';
import { RecipeAvgOrderByAggregateInput } from './recipe-avg-order-by-aggregate.input';
import { RecipeMaxOrderByAggregateInput } from './recipe-max-order-by-aggregate.input';
import { RecipeMinOrderByAggregateInput } from './recipe-min-order-by-aggregate.input';
import { RecipeSumOrderByAggregateInput } from './recipe-sum-order-by-aggregate.input';

@InputType()
export class RecipeOrderByWithAggregationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    description?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    directions?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    ingredients?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    prepTime?: SortOrderInput;

    @Field(() => SortOrderInput, {nullable:true})
    cookTime?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    isPublic?: keyof typeof SortOrder;

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

    @Field(() => RecipeCountOrderByAggregateInput, {nullable:true})
    @Type(() => RecipeCountOrderByAggregateInput)
    _count?: RecipeCountOrderByAggregateInput;

    @Field(() => RecipeAvgOrderByAggregateInput, {nullable:true})
    @Type(() => RecipeAvgOrderByAggregateInput)
    _avg?: RecipeAvgOrderByAggregateInput;

    @Field(() => RecipeMaxOrderByAggregateInput, {nullable:true})
    @Type(() => RecipeMaxOrderByAggregateInput)
    _max?: RecipeMaxOrderByAggregateInput;

    @Field(() => RecipeMinOrderByAggregateInput, {nullable:true})
    @Type(() => RecipeMinOrderByAggregateInput)
    _min?: RecipeMinOrderByAggregateInput;

    @Field(() => RecipeSumOrderByAggregateInput, {nullable:true})
    @Type(() => RecipeSumOrderByAggregateInput)
    _sum?: RecipeSumOrderByAggregateInput;
}
