import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RecipeCreateingredientsInput } from './recipe-createingredients.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { CookbookCreateNestedManyWithoutRecipesInput } from '../cookbook/cookbook-create-nested-many-without-recipes.input';
import { CommunityCreateNestedManyWithoutRecipesInput } from '../community/community-create-nested-many-without-recipes.input';

@InputType()
export class RecipeCreateWithoutUserInput {

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

    @Field(() => Int, {nullable:true})
    ratingsCount?: number;

    @Field(() => String, {nullable:true})
    image?: string;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => CookbookCreateNestedManyWithoutRecipesInput, {nullable:true})
    @Type(() => CookbookCreateNestedManyWithoutRecipesInput)
    cookbook?: CookbookCreateNestedManyWithoutRecipesInput;

    @Field(() => CommunityCreateNestedManyWithoutRecipesInput, {nullable:true})
    @Type(() => CommunityCreateNestedManyWithoutRecipesInput)
    communities?: CommunityCreateNestedManyWithoutRecipesInput;
}
