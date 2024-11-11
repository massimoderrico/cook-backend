import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CookbookCreateWithoutRecipesInput } from './cookbook-create-without-recipes.input';
import { Type } from 'class-transformer';
import { CookbookCreateOrConnectWithoutRecipesInput } from './cookbook-create-or-connect-without-recipes.input';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';

@InputType()
export class CookbookCreateNestedManyWithoutRecipesInput {

    @Field(() => [CookbookCreateWithoutRecipesInput], {nullable:true})
    @Type(() => CookbookCreateWithoutRecipesInput)
    create?: Array<CookbookCreateWithoutRecipesInput>;

    @Field(() => [CookbookCreateOrConnectWithoutRecipesInput], {nullable:true})
    @Type(() => CookbookCreateOrConnectWithoutRecipesInput)
    connectOrCreate?: Array<CookbookCreateOrConnectWithoutRecipesInput>;

    @Field(() => [CookbookWhereUniqueInput], {nullable:true})
    @Type(() => CookbookWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>>;
}
