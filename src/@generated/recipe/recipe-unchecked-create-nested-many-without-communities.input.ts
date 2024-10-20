import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RecipeCreateWithoutCommunitiesInput } from './recipe-create-without-communities.input';
import { Type } from 'class-transformer';
import { RecipeCreateOrConnectWithoutCommunitiesInput } from './recipe-create-or-connect-without-communities.input';
import { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInput } from './recipe-where-unique.input';

@InputType()
export class RecipeUncheckedCreateNestedManyWithoutCommunitiesInput {

    @Field(() => [RecipeCreateWithoutCommunitiesInput], {nullable:true})
    @Type(() => RecipeCreateWithoutCommunitiesInput)
    create?: Array<RecipeCreateWithoutCommunitiesInput>;

    @Field(() => [RecipeCreateOrConnectWithoutCommunitiesInput], {nullable:true})
    @Type(() => RecipeCreateOrConnectWithoutCommunitiesInput)
    connectOrCreate?: Array<RecipeCreateOrConnectWithoutCommunitiesInput>;

    @Field(() => [RecipeWhereUniqueInput], {nullable:true})
    @Type(() => RecipeWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<RecipeWhereUniqueInput, 'id'>>;
}
