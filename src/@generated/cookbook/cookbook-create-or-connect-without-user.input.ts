import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';
import { Type } from 'class-transformer';
import { CookbookCreateWithoutUserInput } from './cookbook-create-without-user.input';

@InputType()
export class CookbookCreateOrConnectWithoutUserInput {

    @Field(() => CookbookWhereUniqueInput, {nullable:false})
    @Type(() => CookbookWhereUniqueInput)
    where!: Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>;

    @Field(() => CookbookCreateWithoutUserInput, {nullable:false})
    @Type(() => CookbookCreateWithoutUserInput)
    create!: CookbookCreateWithoutUserInput;
}
