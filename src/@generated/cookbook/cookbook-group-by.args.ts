import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CookbookWhereInput } from './cookbook-where.input';
import { Type } from 'class-transformer';
import { CookbookOrderByWithAggregationInput } from './cookbook-order-by-with-aggregation.input';
import { CookbookScalarFieldEnum } from './cookbook-scalar-field.enum';
import { CookbookScalarWhereWithAggregatesInput } from './cookbook-scalar-where-with-aggregates.input';
import { Int } from '@nestjs/graphql';
import { CookbookCountAggregateInput } from './cookbook-count-aggregate.input';
import { CookbookAvgAggregateInput } from './cookbook-avg-aggregate.input';
import { CookbookSumAggregateInput } from './cookbook-sum-aggregate.input';
import { CookbookMinAggregateInput } from './cookbook-min-aggregate.input';
import { CookbookMaxAggregateInput } from './cookbook-max-aggregate.input';

@ArgsType()
export class CookbookGroupByArgs {

    @Field(() => CookbookWhereInput, {nullable:true})
    @Type(() => CookbookWhereInput)
    where?: CookbookWhereInput;

    @Field(() => [CookbookOrderByWithAggregationInput], {nullable:true})
    @Type(() => CookbookOrderByWithAggregationInput)
    orderBy?: Array<CookbookOrderByWithAggregationInput>;

    @Field(() => [CookbookScalarFieldEnum], {nullable:false})
    by!: Array<keyof typeof CookbookScalarFieldEnum>;

    @Field(() => CookbookScalarWhereWithAggregatesInput, {nullable:true})
    @Type(() => CookbookScalarWhereWithAggregatesInput)
    having?: CookbookScalarWhereWithAggregatesInput;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => CookbookCountAggregateInput, {nullable:true})
    @Type(() => CookbookCountAggregateInput)
    _count?: CookbookCountAggregateInput;

    @Field(() => CookbookAvgAggregateInput, {nullable:true})
    @Type(() => CookbookAvgAggregateInput)
    _avg?: CookbookAvgAggregateInput;

    @Field(() => CookbookSumAggregateInput, {nullable:true})
    @Type(() => CookbookSumAggregateInput)
    _sum?: CookbookSumAggregateInput;

    @Field(() => CookbookMinAggregateInput, {nullable:true})
    @Type(() => CookbookMinAggregateInput)
    _min?: CookbookMinAggregateInput;

    @Field(() => CookbookMaxAggregateInput, {nullable:true})
    @Type(() => CookbookMaxAggregateInput)
    _max?: CookbookMaxAggregateInput;
}
