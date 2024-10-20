import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';
import { Type } from 'class-transformer';
import { CookbookCreateInput } from './cookbook-create.input';
import { CookbookUpdateInput } from './cookbook-update.input';

@ArgsType()
export class UpsertOneCookbookArgs {

    @Field(() => CookbookWhereUniqueInput, {nullable:false})
    @Type(() => CookbookWhereUniqueInput)
    where!: Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>;

    @Field(() => CookbookCreateInput, {nullable:false})
    @Type(() => CookbookCreateInput)
    create!: CookbookCreateInput;

    @Field(() => CookbookUpdateInput, {nullable:false})
    @Type(() => CookbookUpdateInput)
    update!: CookbookUpdateInput;
}
