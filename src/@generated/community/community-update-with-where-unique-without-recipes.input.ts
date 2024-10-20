import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';
import { Type } from 'class-transformer';
import { CommunityUpdateWithoutRecipesInput } from './community-update-without-recipes.input';

@InputType()
export class CommunityUpdateWithWhereUniqueWithoutRecipesInput {

    @Field(() => CommunityWhereUniqueInput, {nullable:false})
    @Type(() => CommunityWhereUniqueInput)
    where!: Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>;

    @Field(() => CommunityUpdateWithoutRecipesInput, {nullable:false})
    @Type(() => CommunityUpdateWithoutRecipesInput)
    data!: CommunityUpdateWithoutRecipesInput;
}
