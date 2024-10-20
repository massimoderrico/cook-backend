import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { User } from '../user/user.model';
import { Recipe } from '../recipe/recipe.model';
import { Cookbook } from '../cookbook/cookbook.model';
import { CommunityCount } from './community-count.output';

@ObjectType()
export class Community {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description!: string | null;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => User, {nullable:false})
    user?: User;

    @Field(() => [Recipe], {nullable:true})
    recipes?: Array<Recipe>;

    @Field(() => [Cookbook], {nullable:true})
    cookbooks?: Array<Cookbook>;

    @Field(() => CommunityCount, {nullable:false})
    _count?: CommunityCount;
}
