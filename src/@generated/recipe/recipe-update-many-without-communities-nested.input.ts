import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RecipeCreateWithoutCommunitiesInput } from './recipe-create-without-communities.input';
import { Type } from 'class-transformer';
import { RecipeCreateOrConnectWithoutCommunitiesInput } from './recipe-create-or-connect-without-communities.input';
import { RecipeUpsertWithWhereUniqueWithoutCommunitiesInput } from './recipe-upsert-with-where-unique-without-communities.input';
import { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInput } from './recipe-where-unique.input';
import { RecipeUpdateWithWhereUniqueWithoutCommunitiesInput } from './recipe-update-with-where-unique-without-communities.input';
import { RecipeUpdateManyWithWhereWithoutCommunitiesInput } from './recipe-update-many-with-where-without-communities.input';
import { RecipeScalarWhereInput } from './recipe-scalar-where.input';

@InputType()
export class RecipeUpdateManyWithoutCommunitiesNestedInput {

    @Field(() => [RecipeCreateWithoutCommunitiesInput], {nullable:true})
    @Type(() => RecipeCreateWithoutCommunitiesInput)
    create?: Array<RecipeCreateWithoutCommunitiesInput>;

    @Field(() => [RecipeCreateOrConnectWithoutCommunitiesInput], {nullable:true})
    @Type(() => RecipeCreateOrConnectWithoutCommunitiesInput)
    connectOrCreate?: Array<RecipeCreateOrConnectWithoutCommunitiesInput>;

    @Field(() => [RecipeUpsertWithWhereUniqueWithoutCommunitiesInput], {nullable:true})
    @Type(() => RecipeUpsertWithWhereUniqueWithoutCommunitiesInput)
    upsert?: Array<RecipeUpsertWithWhereUniqueWithoutCommunitiesInput>;

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

    @Field(() => [RecipeUpdateWithWhereUniqueWithoutCommunitiesInput], {nullable:true})
    @Type(() => RecipeUpdateWithWhereUniqueWithoutCommunitiesInput)
    update?: Array<RecipeUpdateWithWhereUniqueWithoutCommunitiesInput>;

    @Field(() => [RecipeUpdateManyWithWhereWithoutCommunitiesInput], {nullable:true})
    @Type(() => RecipeUpdateManyWithWhereWithoutCommunitiesInput)
    updateMany?: Array<RecipeUpdateManyWithWhereWithoutCommunitiesInput>;

    @Field(() => [RecipeScalarWhereInput], {nullable:true})
    @Type(() => RecipeScalarWhereInput)
    deleteMany?: Array<RecipeScalarWhereInput>;
}
