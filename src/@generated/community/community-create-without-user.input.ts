import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RecipeCreateNestedManyWithoutCommunitiesInput } from '../recipe/recipe-create-nested-many-without-communities.input';
import { Type } from 'class-transformer';
import { CookbookCreateNestedManyWithoutCommunitiesInput } from '../cookbook/cookbook-create-nested-many-without-communities.input';

@InputType()
export class CommunityCreateWithoutUserInput {

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => RecipeCreateNestedManyWithoutCommunitiesInput, {nullable:true})
    @Type(() => RecipeCreateNestedManyWithoutCommunitiesInput)
    recipes?: RecipeCreateNestedManyWithoutCommunitiesInput;

    @Field(() => CookbookCreateNestedManyWithoutCommunitiesInput, {nullable:true})
    @Type(() => CookbookCreateNestedManyWithoutCommunitiesInput)
    cookbooks?: CookbookCreateNestedManyWithoutCommunitiesInput;
}
