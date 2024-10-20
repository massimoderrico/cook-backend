import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommunityCreateWithoutRecipesInput } from './community-create-without-recipes.input';
import { Type } from 'class-transformer';
import { CommunityCreateOrConnectWithoutRecipesInput } from './community-create-or-connect-without-recipes.input';
import { CommunityUpsertWithWhereUniqueWithoutRecipesInput } from './community-upsert-with-where-unique-without-recipes.input';
import { Prisma } from '@prisma/client';
import { CommunityWhereUniqueInput } from './community-where-unique.input';
import { CommunityUpdateWithWhereUniqueWithoutRecipesInput } from './community-update-with-where-unique-without-recipes.input';
import { CommunityUpdateManyWithWhereWithoutRecipesInput } from './community-update-many-with-where-without-recipes.input';
import { CommunityScalarWhereInput } from './community-scalar-where.input';

@InputType()
export class CommunityUncheckedUpdateManyWithoutRecipesNestedInput {

    @Field(() => [CommunityCreateWithoutRecipesInput], {nullable:true})
    @Type(() => CommunityCreateWithoutRecipesInput)
    create?: Array<CommunityCreateWithoutRecipesInput>;

    @Field(() => [CommunityCreateOrConnectWithoutRecipesInput], {nullable:true})
    @Type(() => CommunityCreateOrConnectWithoutRecipesInput)
    connectOrCreate?: Array<CommunityCreateOrConnectWithoutRecipesInput>;

    @Field(() => [CommunityUpsertWithWhereUniqueWithoutRecipesInput], {nullable:true})
    @Type(() => CommunityUpsertWithWhereUniqueWithoutRecipesInput)
    upsert?: Array<CommunityUpsertWithWhereUniqueWithoutRecipesInput>;

    @Field(() => [CommunityWhereUniqueInput], {nullable:true})
    @Type(() => CommunityWhereUniqueInput)
    set?: Array<Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>>;

    @Field(() => [CommunityWhereUniqueInput], {nullable:true})
    @Type(() => CommunityWhereUniqueInput)
    disconnect?: Array<Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>>;

    @Field(() => [CommunityWhereUniqueInput], {nullable:true})
    @Type(() => CommunityWhereUniqueInput)
    delete?: Array<Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>>;

    @Field(() => [CommunityWhereUniqueInput], {nullable:true})
    @Type(() => CommunityWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CommunityWhereUniqueInput, 'id' | 'name'>>;

    @Field(() => [CommunityUpdateWithWhereUniqueWithoutRecipesInput], {nullable:true})
    @Type(() => CommunityUpdateWithWhereUniqueWithoutRecipesInput)
    update?: Array<CommunityUpdateWithWhereUniqueWithoutRecipesInput>;

    @Field(() => [CommunityUpdateManyWithWhereWithoutRecipesInput], {nullable:true})
    @Type(() => CommunityUpdateManyWithWhereWithoutRecipesInput)
    updateMany?: Array<CommunityUpdateManyWithWhereWithoutRecipesInput>;

    @Field(() => [CommunityScalarWhereInput], {nullable:true})
    @Type(() => CommunityScalarWhereInput)
    deleteMany?: Array<CommunityScalarWhereInput>;
}
