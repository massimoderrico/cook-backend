import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Role } from '../prisma/role.enum';
import { RecipeCreateNestedManyWithoutUserInput } from '../recipe/recipe-create-nested-many-without-user.input';
import { Type } from 'class-transformer';
import { CookbookCreateNestedManyWithoutUserInput } from '../cookbook/cookbook-create-nested-many-without-user.input';
import { CommunityCreateNestedManyWithoutUserInput } from '../community/community-create-nested-many-without-user.input';

@InputType()
export class UserCreateWithoutCommentsInput {

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    username!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => Int, {nullable:true})
    mainCookbookId?: number;

    @Field(() => String, {nullable:true})
    image?: string;

    @Field(() => Role, {nullable:true})
    role?: keyof typeof Role;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => RecipeCreateNestedManyWithoutUserInput, {nullable:true})
    @Type(() => RecipeCreateNestedManyWithoutUserInput)
    recipes?: RecipeCreateNestedManyWithoutUserInput;

    @Field(() => CookbookCreateNestedManyWithoutUserInput, {nullable:true})
    @Type(() => CookbookCreateNestedManyWithoutUserInput)
    cookbooks?: CookbookCreateNestedManyWithoutUserInput;

    @Field(() => CommunityCreateNestedManyWithoutUserInput, {nullable:true})
    @Type(() => CommunityCreateNestedManyWithoutUserInput)
    communities?: CommunityCreateNestedManyWithoutUserInput;
}
