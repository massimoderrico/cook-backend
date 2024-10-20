import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInput } from './recipe-where-unique.input';
import { Type } from 'class-transformer';
import { RecipeUpdateWithoutUserInput } from './recipe-update-without-user.input';

@InputType()
export class RecipeUpdateWithWhereUniqueWithoutUserInput {

    @Field(() => RecipeWhereUniqueInput, {nullable:false})
    @Type(() => RecipeWhereUniqueInput)
    where!: Prisma.AtLeast<RecipeWhereUniqueInput, 'id'>;

    @Field(() => RecipeUpdateWithoutUserInput, {nullable:false})
    @Type(() => RecipeUpdateWithoutUserInput)
    data!: RecipeUpdateWithoutUserInput;
}
