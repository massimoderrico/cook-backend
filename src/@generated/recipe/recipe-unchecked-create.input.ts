import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { RecipeCreateingredientsInput } from './recipe-createingredients.input';
import { Type } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { transformToDecimal } from 'prisma-graphql-type-decimal';
import { Transform } from 'class-transformer';
import { CookbookUncheckedCreateNestedManyWithoutRecipesInput } from '../cookbook/cookbook-unchecked-create-nested-many-without-recipes.input';
import { CommunityUncheckedCreateNestedManyWithoutRecipesInput } from '../community/community-unchecked-create-nested-many-without-recipes.input';

@InputType()
export class RecipeUncheckedCreateInput {

    @Field(() => Int, {nullable:true})
    id?: number;

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

    @Field(() => Int, {nullable:false})
    userId!: number;

    @Field(() => GraphQLDecimal, {nullable:true})
    @Type(() => Object)
    @Transform(transformToDecimal)
    rating?: Decimal;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;

    @Field(() => CookbookUncheckedCreateNestedManyWithoutRecipesInput, {nullable:true})
    @Type(() => CookbookUncheckedCreateNestedManyWithoutRecipesInput)
    cookbook?: CookbookUncheckedCreateNestedManyWithoutRecipesInput;

    @Field(() => CommunityUncheckedCreateNestedManyWithoutRecipesInput, {nullable:true})
    @Type(() => CommunityUncheckedCreateNestedManyWithoutRecipesInput)
    communities?: CommunityUncheckedCreateNestedManyWithoutRecipesInput;
}
