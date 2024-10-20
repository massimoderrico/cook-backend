import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommunityCreateWithoutRecipesInput } from './community-create-without-recipes.input';
import { Type } from 'class-transformer';
import { CommunityCreateOrConnectWithoutRecipesInput } from './community-create-or-connect-without-recipes.input';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';

@InputType()
export class CommunityUncheckedCreateNestedManyWithoutRecipesInput {

    @Field(() => [CommunityCreateWithoutRecipesInput], {nullable:true})
    @Type(() => CommunityCreateWithoutRecipesInput)
    create?: Array<CommunityCreateWithoutRecipesInput>;

    @Field(() => [CommunityCreateOrConnectWithoutRecipesInput], {nullable:true})
    @Type(() => CommunityCreateOrConnectWithoutRecipesInput)
    connectOrCreate?: Array<CommunityCreateOrConnectWithoutRecipesInput>;

    @Field(() => [CommunityWhereUniqueInput], {nullable:true})
    @Type(() => CommunityWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>>;
}
