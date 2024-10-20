import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RecipeCreateWithoutUserInput } from './recipe-create-without-user.input';
import { Type } from 'class-transformer';
import { RecipeCreateOrConnectWithoutUserInput } from './recipe-create-or-connect-without-user.input';
import { RecipeCreateManyUserInputEnvelope } from './recipe-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInput } from './recipe-where-unique.input';

@InputType()
export class RecipeUncheckedCreateNestedManyWithoutUserInput {

    @Field(() => [RecipeCreateWithoutUserInput], {nullable:true})
    @Type(() => RecipeCreateWithoutUserInput)
    create?: Array<RecipeCreateWithoutUserInput>;

    @Field(() => [RecipeCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => RecipeCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<RecipeCreateOrConnectWithoutUserInput>;

    @Field(() => RecipeCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => RecipeCreateManyUserInputEnvelope)
    createMany?: RecipeCreateManyUserInputEnvelope;

    @Field(() => [RecipeWhereUniqueInput], {nullable:true})
    @Type(() => RecipeWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<RecipeWhereUniqueInput, 'id'>>;
}
