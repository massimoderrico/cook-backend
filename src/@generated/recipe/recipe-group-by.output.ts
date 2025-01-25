import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { RecipeCountAggregate } from './recipe-count-aggregate.output';
import { RecipeAvgAggregate } from './recipe-avg-aggregate.output';
import { RecipeSumAggregate } from './recipe-sum-aggregate.output';
import { RecipeMinAggregate } from './recipe-min-aggregate.output';
import { RecipeMaxAggregate } from './recipe-max-aggregate.output';

@ObjectType()
export class RecipeGroupBy {

    @Field(() => Int, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => [String], {nullable:true})
    directions?: Array<string>;

    @Field(() => [String], {nullable:true})
    ingredients?: Array<string>;

    @Field(() => Int, {nullable:true})
    prepTime?: number;

    @Field(() => Int, {nullable:true})
    cookTime?: number;

    @Field(() => Boolean, {nullable:false})
    isPublic!: boolean;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => GraphQLDecimal, {nullable:true})
    rating?: Decimal;

    @Field(() => Int, {nullable:false})
    ratingsCount!: number;

    @Field(() => String, {nullable:true})
    image?: string;

    @Field(() => Date, {nullable:false})
    createdAt!: Date | string;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date | string;

    @Field(() => RecipeCountAggregate, {nullable:true})
    _count?: RecipeCountAggregate;

    @Field(() => RecipeAvgAggregate, {nullable:true})
    _avg?: RecipeAvgAggregate;

    @Field(() => RecipeSumAggregate, {nullable:true})
    _sum?: RecipeSumAggregate;

    @Field(() => RecipeMinAggregate, {nullable:true})
    _min?: RecipeMinAggregate;

    @Field(() => RecipeMaxAggregate, {nullable:true})
    _max?: RecipeMaxAggregate;
}
