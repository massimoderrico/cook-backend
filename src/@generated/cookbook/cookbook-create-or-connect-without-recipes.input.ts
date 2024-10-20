import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';
import { Type } from 'class-transformer';
import { CookbookCreateWithoutRecipesInput } from './cookbook-create-without-recipes.input';

@InputType()
export class CookbookCreateOrConnectWithoutRecipesInput {

    @Field(() => CookbookWhereUniqueInput, {nullable:false})
    @Type(() => CookbookWhereUniqueInput)
    where!: Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>;

    @Field(() => CookbookCreateWithoutRecipesInput, {nullable:false})
    @Type(() => CookbookCreateWithoutRecipesInput)
    create!: CookbookCreateWithoutRecipesInput;
}
