import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Role } from '../prisma/role.enum';
import { CookbookCreateNestedManyWithoutUserInput } from '../cookbook/cookbook-create-nested-many-without-user.input';
import { Type } from 'class-transformer';
import { CommunityCreateNestedManyWithoutUserInput } from '../community/community-create-nested-many-without-user.input';
import { CommentCreateNestedManyWithoutUserInput } from '../comment/comment-create-nested-many-without-user.input';

@InputType()
export class UserCreateWithoutRecipesInput {

    @Field(() => String, {nullable:true})
    name?: string;

    @Field(() => String, {nullable:false})
    email!: string;

    @Field(() => String, {nullable:false})
    username!: string;

    @Field(() => String, {nullable:false})
    password!: string;

    @Field(() => Int, {nullable:false})
    mainCookbookId!: number;

    @Field(() => Role, {nullable:true})
    role?: keyof typeof Role;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => CookbookCreateNestedManyWithoutUserInput, {nullable:true})
    @Type(() => CookbookCreateNestedManyWithoutUserInput)
    cookbooks?: CookbookCreateNestedManyWithoutUserInput;

    @Field(() => CommunityCreateNestedManyWithoutUserInput, {nullable:true})
    @Type(() => CommunityCreateNestedManyWithoutUserInput)
    communities?: CommunityCreateNestedManyWithoutUserInput;

    @Field(() => CommentCreateNestedManyWithoutUserInput, {nullable:true})
    @Type(() => CommentCreateNestedManyWithoutUserInput)
    comments?: CommentCreateNestedManyWithoutUserInput;
}
