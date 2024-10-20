import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { RecipeUncheckedCreateNestedManyWithoutCommunitiesInput } from '../recipe/recipe-unchecked-create-nested-many-without-communities.input';
import { Type } from 'class-transformer';

@InputType()
export class CommunityUncheckedCreateWithoutCookbooksInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => RecipeUncheckedCreateNestedManyWithoutCommunitiesInput, {nullable:true})
    @Type(() => RecipeUncheckedCreateNestedManyWithoutCommunitiesInput)
    recipes?: RecipeUncheckedCreateNestedManyWithoutCommunitiesInput;
}
