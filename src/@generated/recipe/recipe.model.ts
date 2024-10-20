import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { Decimal } from '@prisma/client/runtime/library';
import { User } from '../user/user.model';
import { Cookbook } from '../cookbook/cookbook.model';
import { Community } from '../community/community.model';
import { RecipeCount } from './recipe-count.output';

@ObjectType()
export class Recipe {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description!: string | null;

    @Field(() => String, {nullable:true})
    directions!: string | null;

    @Field(() => [String], {nullable:true})
    ingredients!: Array<string>;

    @Field(() => Int, {nullable:true})
    prepTime!: number | null;

    @Field(() => Int, {nullable:true})
    cookTime!: number | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    isPublic!: boolean;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => Int, {nullable:false})
    cookbookId!: number;

    @Field(() => GraphQLDecimal, {nullable:true})
    rating!: Decimal | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => Cookbook, {nullable:false})
    cookbook?: Cookbook;

    @Field(() => [Community], {nullable:true})
    communities?: Array<Community>;

    @Field(() => RecipeCount, {nullable:false})
    _count?: RecipeCount;
}
