import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CookbookUpdateInput } from './cookbook-update.input';
import { Type } from 'class-transformer';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';

@ArgsType()
export class UpdateOneCookbookArgs {

    @Field(() => CookbookUpdateInput, {nullable:false})
    @Type(() => CookbookUpdateInput)
    data!: CookbookUpdateInput;

    @Field(() => CookbookWhereUniqueInput, {nullable:false})
    @Type(() => CookbookWhereUniqueInput)
    where!: Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>;
}
