import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { CookbookCountAggregate } from './cookbook-count-aggregate.output';
import { CookbookAvgAggregate } from './cookbook-avg-aggregate.output';
import { CookbookSumAggregate } from './cookbook-sum-aggregate.output';
import { CookbookMinAggregate } from './cookbook-min-aggregate.output';
import { CookbookMaxAggregate } from './cookbook-max-aggregate.output';

@ObjectType()
export class AggregateCookbook {

    @Field(() => CookbookCountAggregate, {nullable:true})
    _count?: CookbookCountAggregate;

    @Field(() => CookbookAvgAggregate, {nullable:true})
    _avg?: CookbookAvgAggregate;

    @Field(() => CookbookSumAggregate, {nullable:true})
    _sum?: CookbookSumAggregate;

    @Field(() => CookbookMinAggregate, {nullable:true})
    _min?: CookbookMinAggregate;

    @Field(() => CookbookMaxAggregate, {nullable:true})
    _max?: CookbookMaxAggregate;
}
