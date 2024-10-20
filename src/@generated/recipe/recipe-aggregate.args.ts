import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { RecipeWhereInput } from './recipe-where.input';
import { Type } from 'class-transformer';
import { RecipeOrderByWithRelationInput } from './recipe-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInput } from './recipe-where-unique.input';
import { Int } from '@nestjs/graphql';
import { RecipeCountAggregateInput } from './recipe-count-aggregate.input';
import { RecipeAvgAggregateInput } from './recipe-avg-aggregate.input';
import { RecipeSumAggregateInput } from './recipe-sum-aggregate.input';
import { RecipeMinAggregateInput } from './recipe-min-aggregate.input';
import { RecipeMaxAggregateInput } from './recipe-max-aggregate.input';

@ArgsType()
export class RecipeAggregateArgs {

    @Field(() => RecipeWhereInput, {nullable:true})
    @Type(() => RecipeWhereInput)
    where?: RecipeWhereInput;

    @Field(() => [RecipeOrderByWithRelationInput], {nullable:true})
    @Type(() => RecipeOrderByWithRelationInput)
    orderBy?: Array<RecipeOrderByWithRelationInput>;

    @Field(() => RecipeWhereUniqueInput, {nullable:true})
    @Type(() => RecipeWhereUniqueInput)
    cursor?: Prisma.AtLeast<RecipeWhereUniqueInput, 'id'>;

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
