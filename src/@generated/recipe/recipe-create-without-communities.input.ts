import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RecipeCreateingredientsInput } from './recipe-createingredients.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { UserCreateNestedOneWithoutRecipesInput } from '../user/user-create-nested-one-without-recipes.input';
import { CookbookCreateNestedOneWithoutRecipesInput } from '../cookbook/cookbook-create-nested-one-without-recipes.input';

@InputType()
export class RecipeCreateWithoutCommunitiesInput {

    @Field(() => String, {nullable:false})
    name!: string;

    @Field(() => String, {nullable:true})
    description?: string;

    @Field(() => String, {nullable:true})
    directions?: string;

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

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => UserCreateNestedOneWithoutRecipesInput, {nullable:false})
    @Type(() => UserCreateNestedOneWithoutRecipesInput)
    user!: UserCreateNestedOneWithoutRecipesInput;

    @Field(() => CookbookCreateNestedOneWithoutRecipesInput, {nullable:false})
    @Type(() => CookbookCreateNestedOneWithoutRecipesInput)
    cookbook!: CookbookCreateNestedOneWithoutRecipesInput;
}
