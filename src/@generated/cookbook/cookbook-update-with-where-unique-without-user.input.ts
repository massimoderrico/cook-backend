import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';
import { Type } from 'class-transformer';
import { CookbookUpdateWithoutUserInput } from './cookbook-update-without-user.input';

@InputType()
export class CookbookUpdateWithWhereUniqueWithoutUserInput {

    @Field(() => CookbookWhereUniqueInput, {nullable:false})
    @Type(() => CookbookWhereUniqueInput)
    where!: Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>;

    @Field(() => CookbookUpdateWithoutUserInput, {nullable:false})
    @Type(() => CookbookUpdateWithoutUserInput)
    data!: CookbookUpdateWithoutUserInput;
}
