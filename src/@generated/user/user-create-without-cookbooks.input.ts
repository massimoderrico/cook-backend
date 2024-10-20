import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Role } from '../prisma/role.enum';
import { RecipeCreateNestedManyWithoutUserInput } from '../recipe/recipe-create-nested-many-without-user.input';
import { Type } from 'class-transformer';
import { CommunityCreateNestedManyWithoutUserInput } from '../community/community-create-nested-many-without-user.input';
import { CommentCreateNestedManyWithoutUserInput } from '../comment/comment-create-nested-many-without-user.input';

@InputType()
export class UserCreateWithoutCookbooksInput {

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

    @Field(() => Role, {nullable:true})
    role?: keyof typeof Role;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => RecipeCreateNestedManyWithoutUserInput, {nullable:true})
    @Type(() => RecipeCreateNestedManyWithoutUserInput)
    recipes?: RecipeCreateNestedManyWithoutUserInput;

    @Field(() => CommunityCreateNestedManyWithoutUserInput, {nullable:true})
    @Type(() => CommunityCreateNestedManyWithoutUserInput)
    communities?: CommunityCreateNestedManyWithoutUserInput;

    @Field(() => CommentCreateNestedManyWithoutUserInput, {nullable:true})
    @Type(() => CommentCreateNestedManyWithoutUserInput)
    comments?: CommentCreateNestedManyWithoutUserInput;
}
