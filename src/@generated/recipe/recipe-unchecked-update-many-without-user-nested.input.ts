import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RecipeCreateWithoutUserInput } from './recipe-create-without-user.input';
import { Type } from 'class-transformer';
import { RecipeCreateOrConnectWithoutUserInput } from './recipe-create-or-connect-without-user.input';
import { RecipeUpsertWithWhereUniqueWithoutUserInput } from './recipe-upsert-with-where-unique-without-user.input';
import { RecipeCreateManyUserInputEnvelope } from './recipe-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInput } from './recipe-where-unique.input';
import { RecipeUpdateWithWhereUniqueWithoutUserInput } from './recipe-update-with-where-unique-without-user.input';
import { RecipeUpdateManyWithWhereWithoutUserInput } from './recipe-update-many-with-where-without-user.input';
import { RecipeScalarWhereInput } from './recipe-scalar-where.input';

@InputType()
export class RecipeUncheckedUpdateManyWithoutUserNestedInput {

    @Field(() => [RecipeCreateWithoutUserInput], {nullable:true})
    @Type(() => RecipeCreateWithoutUserInput)
    create?: Array<RecipeCreateWithoutUserInput>;

    @Field(() => [RecipeCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => RecipeCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<RecipeCreateOrConnectWithoutUserInput>;

    @Field(() => [RecipeUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => RecipeUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<RecipeUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => RecipeCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => RecipeCreateManyUserInputEnvelope)
    createMany?: RecipeCreateManyUserInputEnvelope;

    @Field(() => [RecipeWhereUniqueInput], {nullable:true})
    @Type(() => RecipeWhereUniqueInput)
    set?: Array<Prisma.AtLeast<RecipeWhereUniqueInput, 'id'>>;

    @Field(() => [RecipeWhereUniqueInput], {nullable:true})
    @Type(() => RecipeWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<RecipeWhereUniqueInput, 'id'>>;

    @Field(() => [RecipeWhereUniqueInput], {nullable:true})
    @Type(() => RecipeWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<RecipeWhereUniqueInput, 'id'>>;

    @Field(() => [RecipeWhereUniqueInput], {nullable:true})
    @Type(() => RecipeWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<RecipeWhereUniqueInput, 'id'>>;

    @Field(() => [RecipeUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => RecipeUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<RecipeUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [RecipeUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => RecipeUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<RecipeUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [RecipeScalarWhereInput], {nullable:true})
    @Type(() => RecipeScalarWhereInput)
    deleteMany?: Array<RecipeScalarWhereInput>;
}
