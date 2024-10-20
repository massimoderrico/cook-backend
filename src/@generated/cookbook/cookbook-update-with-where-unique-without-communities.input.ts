import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';
import { Type } from 'class-transformer';
import { CookbookUpdateWithoutCommunitiesInput } from './cookbook-update-without-communities.input';

@InputType()
export class CookbookUpdateWithWhereUniqueWithoutCommunitiesInput {

    @Field(() => CookbookWhereUniqueInput, {nullable:false})
    @Type(() => CookbookWhereUniqueInput)
    where!: Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>;

    @Field(() => CookbookUpdateWithoutCommunitiesInput, {nullable:false})
    @Type(() => CookbookUpdateWithoutCommunitiesInput)
    data!: CookbookUpdateWithoutCommunitiesInput;
}
