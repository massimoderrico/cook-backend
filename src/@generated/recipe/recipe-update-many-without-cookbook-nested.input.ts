import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RecipeCreateWithoutCookbookInput } from './recipe-create-without-cookbook.input';
import { Type } from 'class-transformer';
import { RecipeCreateOrConnectWithoutCookbookInput } from './recipe-create-or-connect-without-cookbook.input';
import { RecipeUpsertWithWhereUniqueWithoutCookbookInput } from './recipe-upsert-with-where-unique-without-cookbook.input';
import { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInput } from './recipe-where-unique.input';
import { RecipeUpdateWithWhereUniqueWithoutCookbookInput } from './recipe-update-with-where-unique-without-cookbook.input';
import { RecipeUpdateManyWithWhereWithoutCookbookInput } from './recipe-update-many-with-where-without-cookbook.input';
import { RecipeScalarWhereInput } from './recipe-scalar-where.input';

@InputType()
export class RecipeUpdateManyWithoutCookbookNestedInput {

    @Field(() => [RecipeCreateWithoutCookbookInput], {nullable:true})
    @Type(() => RecipeCreateWithoutCookbookInput)
    create?: Array<RecipeCreateWithoutCookbookInput>;

    @Field(() => [RecipeCreateOrConnectWithoutCookbookInput], {nullable:true})
    @Type(() => RecipeCreateOrConnectWithoutCookbookInput)
    connectOrCreate?: Array<RecipeCreateOrConnectWithoutCookbookInput>;

    @Field(() => [RecipeUpsertWithWhereUniqueWithoutCookbookInput], {nullable:true})
    @Type(() => RecipeUpsertWithWhereUniqueWithoutCookbookInput)
    upsert?: Array<RecipeUpsertWithWhereUniqueWithoutCookbookInput>;

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

    @Field(() => [RecipeUpdateWithWhereUniqueWithoutCookbookInput], {nullable:true})
    @Type(() => RecipeUpdateWithWhereUniqueWithoutCookbookInput)
    update?: Array<RecipeUpdateWithWhereUniqueWithoutCookbookInput>;

    @Field(() => [RecipeUpdateManyWithWhereWithoutCookbookInput], {nullable:true})
    @Type(() => RecipeUpdateManyWithWhereWithoutCookbookInput)
    updateMany?: Array<RecipeUpdateManyWithWhereWithoutCookbookInput>;

    @Field(() => [RecipeScalarWhereInput], {nullable:true})
    @Type(() => RecipeScalarWhereInput)
    deleteMany?: Array<RecipeScalarWhereInput>;
}
