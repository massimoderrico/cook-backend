import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { Type } from 'class-transformer';
import { RecipeOrderByRelationAggregateInput } from '../recipe/recipe-order-by-relation-aggregate.input';
import { CookbookOrderByRelationAggregateInput } from '../cookbook/cookbook-order-by-relation-aggregate.input';

@InputType()
export class CommunityOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    description?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    userId?: keyof typeof SortOrder;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    @Type(() => UserOrderByWithRelationInput)
    user?: UserOrderByWithRelationInput;

    @Field(() => RecipeOrderByRelationAggregateInput, {nullable:true})
    @Type(() => RecipeOrderByRelationAggregateInput)
    recipes?: RecipeOrderByRelationAggregateInput;

    @Field(() => CookbookOrderByRelationAggregateInput, {nullable:true})
    @Type(() => CookbookOrderByRelationAggregateInput)
    cookbooks?: CookbookOrderByRelationAggregateInput;
}
