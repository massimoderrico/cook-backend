import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { RecipeWhereUniqueInput } from './recipe-where-unique.input';
import { Type } from 'class-transformer';
import { RecipeUpdateWithoutCommunitiesInput } from './recipe-update-without-communities.input';
import { RecipeCreateWithoutCommunitiesInput } from './recipe-create-without-communities.input';

@InputType()
export class RecipeUpsertWithWhereUniqueWithoutCommunitiesInput {

    @Field(() => RecipeWhereUniqueInput, {nullable:false})
    @Type(() => RecipeWhereUniqueInput)
    where!: Prisma.AtLeast<RecipeWhereUniqueInput, 'id'>;

    @Field(() => RecipeUpdateWithoutCommunitiesInput, {nullable:false})
    @Type(() => RecipeUpdateWithoutCommunitiesInput)
    update!: RecipeUpdateWithoutCommunitiesInput;

    @Field(() => RecipeCreateWithoutCommunitiesInput, {nullable:false})
    @Type(() => RecipeCreateWithoutCommunitiesInput)
    create!: RecipeCreateWithoutCommunitiesInput;
}
