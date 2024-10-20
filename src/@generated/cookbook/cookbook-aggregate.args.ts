import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CookbookWhereInput } from './cookbook-where.input';
import { Type } from 'class-transformer';
import { CookbookOrderByWithRelationInput } from './cookbook-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CookbookCountAggregateInput } from './cookbook-count-aggregate.input';
import { CookbookAvgAggregateInput } from './cookbook-avg-aggregate.input';
import { CookbookSumAggregateInput } from './cookbook-sum-aggregate.input';
import { CookbookMinAggregateInput } from './cookbook-min-aggregate.input';
import { CookbookMaxAggregateInput } from './cookbook-max-aggregate.input';

@ArgsType()
export class CookbookAggregateArgs {

    @Field(() => CookbookWhereInput, {nullable:true})
    @Type(() => CookbookWhereInput)
    where?: CookbookWhereInput;

    @Field(() => [CookbookOrderByWithRelationInput], {nullable:true})
    @Type(() => CookbookOrderByWithRelationInput)
    orderBy?: Array<CookbookOrderByWithRelationInput>;

    @Field(() => CookbookWhereUniqueInput, {nullable:true})
    @Type(() => CookbookWhereUniqueInput)
    cursor?: Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>;

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
