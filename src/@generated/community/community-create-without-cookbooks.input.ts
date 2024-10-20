import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutCommunitiesInput } from '../user/user-create-nested-one-without-communities.input';
import { Type } from 'class-transformer';
import { RecipeCreateNestedManyWithoutCommunitiesInput } from '../recipe/recipe-create-nested-many-without-communities.input';

@InputType()
export class CommunityCreateWithoutCookbooksInput {

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => UserCreateNestedOneWithoutCommunitiesInput, {nullable:false})
    @Type(() => UserCreateNestedOneWithoutCommunitiesInput)
    user!: UserCreateNestedOneWithoutCommunitiesInput;

    @Field(() => RecipeCreateNestedManyWithoutCommunitiesInput, {nullable:true})
    @Type(() => RecipeCreateNestedManyWithoutCommunitiesInput)
    recipes?: RecipeCreateNestedManyWithoutCommunitiesInput;
}
