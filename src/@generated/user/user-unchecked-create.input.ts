import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Role } from '../prisma/role.enum';
import { Int } from '@nestjs/graphql';
import { RecipeUncheckedCreateNestedManyWithoutUserInput } from '../recipe/recipe-unchecked-create-nested-many-without-user.input';
import { Type } from 'class-transformer';
import { CookbookUncheckedCreateNestedManyWithoutUserInput } from '../cookbook/cookbook-unchecked-create-nested-many-without-user.input';
import { CommunityUncheckedCreateNestedManyWithoutUserInput } from '../community/community-unchecked-create-nested-many-without-user.input';
import { CommentUncheckedCreateNestedManyWithoutUserInput } from '../comment/comment-unchecked-create-nested-many-without-user.input';

@InputType()
export class UserUncheckedCreateInput {

    @Field(() => String, {nullable:true})
    id?: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    username!: string;

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:true})
    image?: string;

    @Field(() => Role, {nullable:true})
    role?: keyof typeof Role;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => Int, {nullable:true})
    mainCookbookId?: number;

    @Field(() => RecipeUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    @Type(() => RecipeUncheckedCreateNestedManyWithoutUserInput)
    recipes?: RecipeUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => CookbookUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    @Type(() => CookbookUncheckedCreateNestedManyWithoutUserInput)
    cookbooks?: CookbookUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => CommunityUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    @Type(() => CommunityUncheckedCreateNestedManyWithoutUserInput)
    communities?: CommunityUncheckedCreateNestedManyWithoutUserInput;

    @Field(() => CommentUncheckedCreateNestedManyWithoutUserInput, {nullable:true})
    @Type(() => CommentUncheckedCreateNestedManyWithoutUserInput)
    comments?: CommentUncheckedCreateNestedManyWithoutUserInput;
}
