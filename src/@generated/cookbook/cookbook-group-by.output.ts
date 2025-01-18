import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { CookbookCountAggregate } from './cookbook-count-aggregate.output';
import { CookbookAvgAggregate } from './cookbook-avg-aggregate.output';
import { CookbookSumAggregate } from './cookbook-sum-aggregate.output';
import { CookbookMinAggregate } from './cookbook-min-aggregate.output';
import { CookbookMaxAggregate } from './cookbook-max-aggregate.output';

@ObjectType()
export class CookbookGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Boolean, {nullable:false})
    isPublic!: boolean;

    @Field(() => Boolean, {nullable:false})
    isMainCookbook!: boolean;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => GraphQLDecimal, {nullable:true})
    rating?: Decimal;

    @Field(() => Int, {nullable:false})
    ratingsCount!: number;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;

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
