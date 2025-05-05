import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { RecipeUncheckedCreateNestedManyWithoutCommunitiesInput } from '../recipe/recipe-unchecked-create-nested-many-without-communities.input';
import { Type } from 'class-transformer';
import { CookbookUncheckedCreateNestedManyWithoutCommunitiesInput } from '../cookbook/cookbook-unchecked-create-nested-many-without-communities.input';

@InputType()
export class CommunityUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => RecipeUncheckedCreateNestedManyWithoutCommunitiesInput, {nullable:true})
    @Type(() => RecipeUncheckedCreateNestedManyWithoutCommunitiesInput)
    recipes?: RecipeUncheckedCreateNestedManyWithoutCommunitiesInput;

    @Field(() => CookbookUncheckedCreateNestedManyWithoutCommunitiesInput, {nullable:true})
    @Type(() => CookbookUncheckedCreateNestedManyWithoutCommunitiesInput)
    cookbooks?: CookbookUncheckedCreateNestedManyWithoutCommunitiesInput;
}
