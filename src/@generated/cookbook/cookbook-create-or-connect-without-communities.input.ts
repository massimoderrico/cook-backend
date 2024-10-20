import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';
import { Type } from 'class-transformer';
import { CookbookCreateWithoutCommunitiesInput } from './cookbook-create-without-communities.input';

@InputType()
export class CookbookCreateOrConnectWithoutCommunitiesInput {

    @Field(() => CookbookWhereUniqueInput, {nullable:false})
    @Type(() => CookbookWhereUniqueInput)
    where!: Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>;

    @Field(() => CookbookCreateWithoutCommunitiesInput, {nullable:false})
    @Type(() => CookbookCreateWithoutCommunitiesInput)
    create!: CookbookCreateWithoutCommunitiesInput;
}
