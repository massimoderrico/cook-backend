import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RecipeCreateWithoutCookbookInput } from './recipe-create-without-cookbook.input';
import { Type } from 'class-transformer';
import { RecipeCreateOrConnectWithoutCookbookInput } from './recipe-create-or-connect-without-cookbook.input';
import { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInput } from './recipe-where-unique.input';

@InputType()
export class RecipeCreateNestedManyWithoutCookbookInput {

    @Field(() => [RecipeCreateWithoutCookbookInput], {nullable:true})
    @Type(() => RecipeCreateWithoutCookbookInput)
    create?: Array<RecipeCreateWithoutCookbookInput>;

    @Field(() => [RecipeCreateOrConnectWithoutCookbookInput], {nullable:true})
    @Type(() => RecipeCreateOrConnectWithoutCookbookInput)
    connectOrCreate?: Array<RecipeCreateOrConnectWithoutCookbookInput>;

    @Field(() => [RecipeWhereUniqueInput], {nullable:true})
    @Type(() => RecipeWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<RecipeWhereUniqueInput, 'id'>>;
}
