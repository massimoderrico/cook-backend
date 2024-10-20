import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { Decimal } from '@prisma/client/runtime/library';
import { User } from '../user/user.model';
import { Recipe } from '../recipe/recipe.model';
import { Community } from '../community/community.model';
import { CookbookCount } from './cookbook-count.output';

@ObjectType()
export class Cookbook {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description!: string | null;

    @Field(() => Boolean, {nullable:false,defaultValue:false})
    isPublic!: boolean;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => GraphQLDecimal, {nullable:true})
    rating!: Decimal | null;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => [Recipe], {nullable:true})
    recipes?: Array<Recipe>;

    @Field(() => [Community], {nullable:true})
    communities?: Array<Community>;

    @Field(() => CookbookCount, {nullable:false})
    _count?: CookbookCount;
}
