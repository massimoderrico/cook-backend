import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';
import { Type } from 'class-transformer';
import { CookbookUpdateWithoutRecipesInput } from './cookbook-update-without-recipes.input';

@InputType()
export class CookbookUpdateWithWhereUniqueWithoutRecipesInput {

    @Field(() => CookbookWhereUniqueInput, {nullable:false})
    @Type(() => CookbookWhereUniqueInput)
    where!: Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>;

    @Field(() => CookbookUpdateWithoutRecipesInput, {nullable:false})
    @Type(() => CookbookUpdateWithoutRecipesInput)
    data!: CookbookUpdateWithoutRecipesInput;
}
