import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { Role } from '../prisma/role.enum';
import { Int } from '@nestjs/graphql';
import { Recipe } from '../recipe/recipe.model';
import { Cookbook } from '../cookbook/cookbook.model';
import { Community } from '../community/community.model';
import { Comment } from '../comment/comment.model';
import { UserCount } from './user-count.output';

@ObjectType()
export class User {

    @Field(() => ID, {nullable:false})
    id!: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    username!: string;

    @Field(() => String, {nullable:true})
    name!: string | null;

    @Field(() => String, {nullable:true})
    image!: string | null;

    @Field(() => Role, {nullable:false,defaultValue:'USER'})
    role!: keyof typeof Role;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => Int, {nullable:true})
    mainCookbookId!: number | null;

    @Field(() => [Recipe], {nullable:true})
    recipes?: Array<Recipe>;

    @Field(() => [Cookbook], {nullable:true})
    cookbooks?: Array<Cookbook>;

    @Field(() => [Community], {nullable:true})
    communities?: Array<Community>;

    @Field(() => [Comment], {nullable:true})
    comments?: Array<Comment>;

    @Field(() => UserCount, {nullable:false})
    _count?: UserCount;
}
