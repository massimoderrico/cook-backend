import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CookbookCreateWithoutRecipesInput } from './cookbook-create-without-recipes.input';
import { Type } from 'class-transformer';
import { CookbookCreateOrConnectWithoutRecipesInput } from './cookbook-create-or-connect-without-recipes.input';
import { CookbookUpsertWithWhereUniqueWithoutRecipesInput } from './cookbook-upsert-with-where-unique-without-recipes.input';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';
import { CookbookUpdateWithWhereUniqueWithoutRecipesInput } from './cookbook-update-with-where-unique-without-recipes.input';
import { CookbookUpdateManyWithWhereWithoutRecipesInput } from './cookbook-update-many-with-where-without-recipes.input';
import { CookbookScalarWhereInput } from './cookbook-scalar-where.input';

@InputType()
export class CookbookUncheckedUpdateManyWithoutRecipesNestedInput {

    @Field(() => [CookbookCreateWithoutRecipesInput], {nullable:true})
    @Type(() => CookbookCreateWithoutRecipesInput)
    create?: Array<CookbookCreateWithoutRecipesInput>;

    @Field(() => [CookbookCreateOrConnectWithoutRecipesInput], {nullable:true})
    @Type(() => CookbookCreateOrConnectWithoutRecipesInput)
    connectOrCreate?: Array<CookbookCreateOrConnectWithoutRecipesInput>;

    @Field(() => [CookbookUpsertWithWhereUniqueWithoutRecipesInput], {nullable:true})
    @Type(() => CookbookUpsertWithWhereUniqueWithoutRecipesInput)
    upsert?: Array<CookbookUpsertWithWhereUniqueWithoutRecipesInput>;

    @Field(() => [CookbookWhereUniqueInput], {nullable:true})
    @Type(() => CookbookWhereUniqueInput)
    set?: Array<Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>>;

    @Field(() => [CookbookWhereUniqueInput], {nullable:true})
    @Type(() => CookbookWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>>;

    @Field(() => [CookbookWhereUniqueInput], {nullable:true})
    @Type(() => CookbookWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>>;

    @Field(() => [CookbookWhereUniqueInput], {nullable:true})
    @Type(() => CookbookWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>>;

    @Field(() => [CookbookUpdateWithWhereUniqueWithoutRecipesInput], {nullable:true})
    @Type(() => CookbookUpdateWithWhereUniqueWithoutRecipesInput)
    update?: Array<CookbookUpdateWithWhereUniqueWithoutRecipesInput>;

    @Field(() => [CookbookUpdateManyWithWhereWithoutRecipesInput], {nullable:true})
    @Type(() => CookbookUpdateManyWithWhereWithoutRecipesInput)
    updateMany?: Array<CookbookUpdateManyWithWhereWithoutRecipesInput>;

    @Field(() => [CookbookScalarWhereInput], {nullable:true})
    @Type(() => CookbookScalarWhereInput)
    deleteMany?: Array<CookbookScalarWhereInput>;
}
