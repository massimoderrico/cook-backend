import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { SortOrder } from '../prisma/sort-order.enum';
import { SortOrderInput } from '../prisma/sort-order.input';
import { RecipeOrderByRelationAggregateInput } from '../recipe/recipe-order-by-relation-aggregate.input';
import { Type } from 'class-transformer';
import { CookbookOrderByRelationAggregateInput } from '../cookbook/cookbook-order-by-relation-aggregate.input';
import { CommunityOrderByRelationAggregateInput } from '../community/community-order-by-relation-aggregate.input';
import { CommentOrderByRelationAggregateInput } from '../comment/comment-order-by-relation-aggregate.input';

@InputType()
export class UserOrderByWithRelationInput {

    @Field(() => SortOrder, {nullable:true})
    id?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    name?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    email?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    username?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    password?: keyof typeof SortOrder;

    @Field(() => SortOrderInput, {nullable:true})
    mainCookbookId?: SortOrderInput;

    @Field(() => SortOrder, {nullable:true})
    role?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    createdAt?: keyof typeof SortOrder;

    @Field(() => SortOrder, {nullable:true})
    updatedAt?: keyof typeof SortOrder;

    @Field(() => RecipeOrderByRelationAggregateInput, {nullable:true})
    @Type(() => RecipeOrderByRelationAggregateInput)
    recipes?: RecipeOrderByRelationAggregateInput;

    @Field(() => CookbookOrderByRelationAggregateInput, {nullable:true})
    @Type(() => CookbookOrderByRelationAggregateInput)
    cookbooks?: CookbookOrderByRelationAggregateInput;

    @Field(() => CommunityOrderByRelationAggregateInput, {nullable:true})
    @Type(() => CommunityOrderByRelationAggregateInput)
    communities?: CommunityOrderByRelationAggregateInput;

    @Field(() => CommentOrderByRelationAggregateInput, {nullable:true})
    @Type(() => CommentOrderByRelationAggregateInput)
    comments?: CommentOrderByRelationAggregateInput;
}
