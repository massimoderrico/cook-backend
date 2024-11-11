import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class RecipeCount {

    @Field(() => Int, {nullable:false})
    cookbook?: number;

    @Field(() => Int, {nullable:false})
    communities?: number;
}
