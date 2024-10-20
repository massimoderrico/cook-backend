import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RecipeWhereInput } from './recipe-where.input';
import { Type } from 'class-transformer';
import { RecipeOrderByWithAggregationInput } from './recipe-order-by-with-aggregation.input';
import { RecipeScalarFieldEnum } from './recipe-scalar-field.enum';
import { RecipeScalarWhereWithAggregatesInput } from './recipe-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { RecipeCountAggregateInput } from './recipe-count-aggregate.input';
import { RecipeAvgAggregateInput } from './recipe-avg-aggregate.input';
import { RecipeSumAggregateInput } from './recipe-sum-aggregate.input';
import { RecipeMinAggregateInput } from './recipe-min-aggregate.input';
import { RecipeMaxAggregateInput } from './recipe-max-aggregate.input';

@ArgsType()
export class RecipeGroupByArgs {

    @Field(() => RecipeWhereInput, {nullable:true})
    @Type(() => RecipeWhereInput)
    where?: RecipeWhereInput;

    @Field(() => [RecipeOrderByWithAggregationInput], {nullable:true})
    @Type(() => RecipeOrderByWithAggregationInput)
    orderBy?: Array<RecipeOrderByWithAggregationInput>;

    @Field(() => [RecipeScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof RecipeScalarFieldEnum>;

    @Field(() => RecipeScalarWhereWithAggregatesInput, {nullable:true})
    @Type(() => RecipeScalarWhereWithAggregatesInput)
    having?: RecipeScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => RecipeCountAggregateInput, {nullable:true})
    @Type(() => RecipeCountAggregateInput)
    _count?: RecipeCountAggregateInput;

    @Field(() => RecipeAvgAggregateInput, {nullable:true})
    @Type(() => RecipeAvgAggregateInput)
    _avg?: RecipeAvgAggregateInput;

    @Field(() => RecipeSumAggregateInput, {nullable:true})
    @Type(() => RecipeSumAggregateInput)
    _sum?: RecipeSumAggregateInput;

    @Field(() => RecipeMinAggregateInput, {nullable:true})
    @Type(() => RecipeMinAggregateInput)
    _min?: RecipeMinAggregateInput;

    @Field(() => RecipeMaxAggregateInput, {nullable:true})
    @Type(() => RecipeMaxAggregateInput)
    _max?: RecipeMaxAggregateInput;
}
