import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CookbookCreateWithoutCommunitiesInput } from './cookbook-create-without-communities.input';
import { Type } from 'class-transformer';
import { CookbookCreateOrConnectWithoutCommunitiesInput } from './cookbook-create-or-connect-without-communities.input';
import { CookbookUpsertWithWhereUniqueWithoutCommunitiesInput } from './cookbook-upsert-with-where-unique-without-communities.input';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';
import { CookbookUpdateWithWhereUniqueWithoutCommunitiesInput } from './cookbook-update-with-where-unique-without-communities.input';
import { CookbookUpdateManyWithWhereWithoutCommunitiesInput } from './cookbook-update-many-with-where-without-communities.input';
import { CookbookScalarWhereInput } from './cookbook-scalar-where.input';

@InputType()
export class CookbookUpdateManyWithoutCommunitiesNestedInput {

    @Field(() => [CookbookCreateWithoutCommunitiesInput], {nullable:true})
    @Type(() => CookbookCreateWithoutCommunitiesInput)
    create?: Array<CookbookCreateWithoutCommunitiesInput>;

    @Field(() => [CookbookCreateOrConnectWithoutCommunitiesInput], {nullable:true})
    @Type(() => CookbookCreateOrConnectWithoutCommunitiesInput)
    connectOrCreate?: Array<CookbookCreateOrConnectWithoutCommunitiesInput>;

    @Field(() => [CookbookUpsertWithWhereUniqueWithoutCommunitiesInput], {nullable:true})
    @Type(() => CookbookUpsertWithWhereUniqueWithoutCommunitiesInput)
    upsert?: Array<CookbookUpsertWithWhereUniqueWithoutCommunitiesInput>;

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

    @Field(() => [CookbookUpdateWithWhereUniqueWithoutCommunitiesInput], {nullable:true})
    @Type(() => CookbookUpdateWithWhereUniqueWithoutCommunitiesInput)
    update?: Array<CookbookUpdateWithWhereUniqueWithoutCommunitiesInput>;

    @Field(() => [CookbookUpdateManyWithWhereWithoutCommunitiesInput], {nullable:true})
    @Type(() => CookbookUpdateManyWithWhereWithoutCommunitiesInput)
    updateMany?: Array<CookbookUpdateManyWithWhereWithoutCommunitiesInput>;

    @Field(() => [CookbookScalarWhereInput], {nullable:true})
    @Type(() => CookbookScalarWhereInput)
    deleteMany?: Array<CookbookScalarWhereInput>;
}
