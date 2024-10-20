import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CookbookUncheckedCreateNestedManyWithoutCommunitiesInput } from '../cookbook/cookbook-unchecked-create-nested-many-without-communities.input';
import { Type } from 'class-transformer';

@InputType()
export class CommunityUncheckedCreateWithoutRecipesInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => CookbookUncheckedCreateNestedManyWithoutCommunitiesInput, {nullable:true})
    @Type(() => CookbookUncheckedCreateNestedManyWithoutCommunitiesInput)
    cookbooks?: CookbookUncheckedCreateNestedManyWithoutCommunitiesInput;
}
