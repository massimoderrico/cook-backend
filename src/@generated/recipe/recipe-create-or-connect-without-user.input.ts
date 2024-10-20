import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInput } from './recipe-where-unique.input';
import { Type } from 'class-transformer';
import { RecipeCreateWithoutUserInput } from './recipe-create-without-user.input';

@InputType()
export class RecipeCreateOrConnectWithoutUserInput {

    @Field(() => RecipeWhereUniqueInput, {nullable:false})
    @Type(() => RecipeWhereUniqueInput)
    where!: Prisma.AtLeast<RecipeWhereUniqueInput, 'id'>;

    @Field(() => RecipeCreateWithoutUserInput, {nullable:false})
    @Type(() => RecipeCreateWithoutUserInput)
    create!: RecipeCreateWithoutUserInput;
}
