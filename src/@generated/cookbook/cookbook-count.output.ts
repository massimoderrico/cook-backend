import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CookbookCount {

    @Field(() => Int, {nullable:false})
    recipes?: number;

    @Field(() => Int, {nullable:false})
    communities?: number;
}
