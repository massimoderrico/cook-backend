import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RecipeCreatedirectionsInput } from './recipe-createdirections.input';
import { Type } from 'class-transformer';
import { RecipeCreateingredientsInput } from './recipe-createingredients.input';
import { Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { UserCreateNestedOneWithoutRecipesInput } from '../user/user-create-nested-one-without-recipes.input';
import { CookbookCreateNestedManyWithoutRecipesInput } from '../cookbook/cookbook-create-nested-many-without-recipes.input';
import { CommunityCreateNestedManyWithoutRecipesInput } from '../community/community-create-nested-many-without-recipes.input';

@InputType()
export class RecipeCreateInput {

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => RecipeCreatedirectionsInput, {nullable:true})
    @Type(() => RecipeCreatedirectionsInput)
    directions?: RecipeCreatedirectionsInput;

    @Field(() => RecipeCreateingredientsInput, {nullable:true})
    @Type(() => RecipeCreateingredientsInput)
    ingredients?: RecipeCreateingredientsInput;

    @Field(() => Int, {nullable:true})
    prepTime?: number;

    @Field(() => Int, {nullable:true})
    cookTime?: number;

    @Field(() => Boolean, {nullable:true})
    isPublic?: boolean;

    @Field(() => GraphQLDecimal, {nullable:true})
    @Type(() => Object)
    @Transform(transformToDecimal)
    rating?: Decimal;

    @Field(() => Int, {nullable:true})
    ratingsCount?: number;

    @Field(() => String, {nullable:true})
    image?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => UserCreateNestedOneWithoutRecipesInput, {nullable:false})
    @Type(() => UserCreateNestedOneWithoutRecipesInput)
    user!: UserCreateNestedOneWithoutRecipesInput;

    @Field(() => CookbookCreateNestedManyWithoutRecipesInput, {nullable:true})
    @Type(() => CookbookCreateNestedManyWithoutRecipesInput)
    cookbook?: CookbookCreateNestedManyWithoutRecipesInput;

    @Field(() => CommunityCreateNestedManyWithoutRecipesInput, {nullable:true})
    @Type(() => CommunityCreateNestedManyWithoutRecipesInput)
    communities?: CommunityCreateNestedManyWithoutRecipesInput;
}
