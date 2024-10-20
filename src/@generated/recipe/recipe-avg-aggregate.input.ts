import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';

@InputType()
export class RecipeAvgAggregateInput {

    @Field(() => Boolean, {nullable:true})
    id?: true;

    @Field(() => Boolean, {nullable:true})
    prepTime?: true;

    @Field(() => Boolean, {nullable:true})
    cookTime?: true;

    @Field(() => Boolean, {nullable:true})
    userId?: true;

    @Field(() => Boolean, {nullable:true})
    cookbookId?: true;

    @Field(() => Boolean, {nullable:true})
    rating?: true;
}
