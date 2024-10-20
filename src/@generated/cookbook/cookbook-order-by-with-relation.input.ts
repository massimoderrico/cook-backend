import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { Type } from 'class-transformer';
import { UserOrderByWithRelationInput } from '../user/user-order-by-with-relation.input';
import { RecipeOrderByRelationAggregateInput } from '../recipe/recipe-order-by-relation-aggregate.input';
import { CommunityOrderByRelationAggregateInput } from '../community/community-order-by-relation-aggregate.input';

@InputType()
export class CookbookOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    name?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    description?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    isPublic?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    userId?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    @Type(() => SortOrderInput)
    rating?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => UserOrderByWithRelationInput, {nullable:true})
    @Type(() => UserOrderByWithRelationInput)
    user?: UserOrderByWithRelationInput;

    @Field(() => RecipeOrderByRelationAggregateInput, {nullable:true})
    @Type(() => RecipeOrderByRelationAggregateInput)
    recipes?: RecipeOrderByRelationAggregateInput;

    @Field(() => CommunityOrderByRelationAggregateInput, {nullable:true})
    @Type(() => CommunityOrderByRelationAggregateInput)
    communities?: CommunityOrderByRelationAggregateInput;
}
