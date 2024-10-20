import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInput } from './recipe-where-unique.input';
import { Type } from 'class-transformer';
import { RecipeUpdateWithoutCookbookInput } from './recipe-update-without-cookbook.input';
import { RecipeCreateWithoutCookbookInput } from './recipe-create-without-cookbook.input';

@InputType()
export class RecipeUpsertWithWhereUniqueWithoutCookbookInput {

    @Field(() => RecipeWhereUniqueInput, {nullable:false})
    @Type(() => RecipeWhereUniqueInput)
    where!: Prisma.AtLeast<RecipeWhereUniqueInput, 'id'>;

    @Field(() => RecipeUpdateWithoutCookbookInput, {nullable:false})
    @Type(() => RecipeUpdateWithoutCookbookInput)
    update!: RecipeUpdateWithoutCookbookInput;

    @Field(() => RecipeCreateWithoutCookbookInput, {nullable:false})
    @Type(() => RecipeCreateWithoutCookbookInput)
    create!: RecipeCreateWithoutCookbookInput;
}
