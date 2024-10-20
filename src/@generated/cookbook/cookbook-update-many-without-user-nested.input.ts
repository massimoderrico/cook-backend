import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CookbookCreateWithoutUserInput } from './cookbook-create-without-user.input';
import { Type } from 'class-transformer';
import { CookbookCreateOrConnectWithoutUserInput } from './cookbook-create-or-connect-without-user.input';
import { CookbookUpsertWithWhereUniqueWithoutUserInput } from './cookbook-upsert-with-where-unique-without-user.input';
import { CookbookCreateManyUserInputEnvelope } from './cookbook-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';
import { CookbookUpdateWithWhereUniqueWithoutUserInput } from './cookbook-update-with-where-unique-without-user.input';
import { CookbookUpdateManyWithWhereWithoutUserInput } from './cookbook-update-many-with-where-without-user.input';
import { CookbookScalarWhereInput } from './cookbook-scalar-where.input';

@InputType()
export class CookbookUpdateManyWithoutUserNestedInput {

    @Field(() => [CookbookCreateWithoutUserInput], {nullable:true})
    @Type(() => CookbookCreateWithoutUserInput)
    create?: Array<CookbookCreateWithoutUserInput>;

    @Field(() => [CookbookCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => CookbookCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<CookbookCreateOrConnectWithoutUserInput>;

    @Field(() => [CookbookUpsertWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => CookbookUpsertWithWhereUniqueWithoutUserInput)
    upsert?: Array<CookbookUpsertWithWhereUniqueWithoutUserInput>;

    @Field(() => CookbookCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => CookbookCreateManyUserInputEnvelope)
    createMany?: CookbookCreateManyUserInputEnvelope;

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

    @Field(() => [CookbookUpdateWithWhereUniqueWithoutUserInput], {nullable:true})
    @Type(() => CookbookUpdateWithWhereUniqueWithoutUserInput)
    update?: Array<CookbookUpdateWithWhereUniqueWithoutUserInput>;

    @Field(() => [CookbookUpdateManyWithWhereWithoutUserInput], {nullable:true})
    @Type(() => CookbookUpdateManyWithWhereWithoutUserInput)
    updateMany?: Array<CookbookUpdateManyWithWhereWithoutUserInput>;

    @Field(() => [CookbookScalarWhereInput], {nullable:true})
    @Type(() => CookbookScalarWhereInput)
    deleteMany?: Array<CookbookScalarWhereInput>;
}
