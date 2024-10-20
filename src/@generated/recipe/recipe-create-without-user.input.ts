import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RecipeCreateingredientsInput } from './recipe-createingredients.input';
import { Type } from 'class-transformer';
import { Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { CookbookCreateNestedOneWithoutRecipesInput } from '../cookbook/cookbook-create-nested-one-without-recipes.input';
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

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => CookbookCreateNestedOneWithoutRecipesInput, {nullable:false})
    @Type(() => CookbookCreateNestedOneWithoutRecipesInput)
    cookbook!: CookbookCreateNestedOneWithoutRecipesInput;

    @Field(() => CommunityCreateNestedManyWithoutRecipesInput, {nullable:true})
    @Type(() => CommunityCreateNestedManyWithoutRecipesInput)
    communities?: CommunityCreateNestedManyWithoutRecipesInput;
}
