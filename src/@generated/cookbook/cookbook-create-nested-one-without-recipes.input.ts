import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CookbookCreateWithoutRecipesInput } from './cookbook-create-without-recipes.input';
import { Type } from 'class-transformer';
import { CookbookCreateOrConnectWithoutRecipesInput } from './cookbook-create-or-connect-without-recipes.input';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';

@InputType()
export class CookbookCreateNestedOneWithoutRecipesInput {

    @Field(() => CookbookCreateWithoutRecipesInput, {nullable:true})
    @Type(() => CookbookCreateWithoutRecipesInput)
    create?: CookbookCreateWithoutRecipesInput;

    @Field(() => CookbookCreateOrConnectWithoutRecipesInput, {nullable:true})
    @Type(() => CookbookCreateOrConnectWithoutRecipesInput)
    connectOrCreate?: CookbookCreateOrConnectWithoutRecipesInput;

    @Field(() => CookbookWhereUniqueInput, {nullable:true})
    @Type(() => CookbookWhereUniqueInput)
    connect?: Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>;
}
