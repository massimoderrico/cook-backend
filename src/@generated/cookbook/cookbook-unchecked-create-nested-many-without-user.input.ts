import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CookbookCreateWithoutUserInput } from './cookbook-create-without-user.input';
import { Type } from 'class-transformer';
import { CookbookCreateOrConnectWithoutUserInput } from './cookbook-create-or-connect-without-user.input';
import { CookbookCreateManyUserInputEnvelope } from './cookbook-create-many-user-input-envelope.input';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';

@InputType()
export class CookbookUncheckedCreateNestedManyWithoutUserInput {

    @Field(() => [CookbookCreateWithoutUserInput], {nullable:true})
    @Type(() => CookbookCreateWithoutUserInput)
    create?: Array<CookbookCreateWithoutUserInput>;

    @Field(() => [CookbookCreateOrConnectWithoutUserInput], {nullable:true})
    @Type(() => CookbookCreateOrConnectWithoutUserInput)
    connectOrCreate?: Array<CookbookCreateOrConnectWithoutUserInput>;

    @Field(() => CookbookCreateManyUserInputEnvelope, {nullable:true})
    @Type(() => CookbookCreateManyUserInputEnvelope)
    createMany?: CookbookCreateManyUserInputEnvelope;

    @Field(() => [CookbookWhereUniqueInput], {nullable:true})
    @Type(() => CookbookWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>>;
}
