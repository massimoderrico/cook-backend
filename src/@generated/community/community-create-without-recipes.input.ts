import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserCreateNestedOneWithoutCommunitiesInput } from '../user/user-create-nested-one-without-communities.input';
import { Type } from 'class-transformer';
import { CookbookCreateNestedManyWithoutCommunitiesInput } from '../cookbook/cookbook-create-nested-many-without-communities.input';

@InputType()
export class CommunityCreateWithoutRecipesInput {

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => UserCreateNestedOneWithoutCommunitiesInput, {nullable:false})
    @Type(() => UserCreateNestedOneWithoutCommunitiesInput)
    user!: UserCreateNestedOneWithoutCommunitiesInput;

    @Field(() => CookbookCreateNestedManyWithoutCommunitiesInput, {nullable:true})
    @Type(() => CookbookCreateNestedManyWithoutCommunitiesInput)
    cookbooks?: CookbookCreateNestedManyWithoutCommunitiesInput;
}
