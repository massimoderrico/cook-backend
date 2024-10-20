import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';
import { Type } from 'class-transformer';
import { CommunityCreateWithoutRecipesInput } from './community-create-without-recipes.input';

@InputType()
export class CommunityCreateOrConnectWithoutRecipesInput {

    @Field(() => CommunityWhereUniqueInput, {nullable:false})
    @Type(() => CommunityWhereUniqueInput)
    where!: Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>;

    @Field(() => CommunityCreateWithoutRecipesInput, {nullable:false})
    @Type(() => CommunityCreateWithoutRecipesInput)
    create!: CommunityCreateWithoutRecipesInput;
}
