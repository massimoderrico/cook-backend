import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CookbookCreateWithoutCommunitiesInput } from './cookbook-create-without-communities.input';
import { Type } from 'class-transformer';
import { CookbookCreateOrConnectWithoutCommunitiesInput } from './cookbook-create-or-connect-without-communities.input';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';

@InputType()
export class CookbookCreateNestedManyWithoutCommunitiesInput {

    @Field(() => [CookbookCreateWithoutCommunitiesInput], {nullable:true})
    @Type(() => CookbookCreateWithoutCommunitiesInput)
    create?: Array<CookbookCreateWithoutCommunitiesInput>;

    @Field(() => [CookbookCreateOrConnectWithoutCommunitiesInput], {nullable:true})
    @Type(() => CookbookCreateOrConnectWithoutCommunitiesInput)
    connectOrCreate?: Array<CookbookCreateOrConnectWithoutCommunitiesInput>;

    @Field(() => [CookbookWhereUniqueInput], {nullable:true})
    @Type(() => CookbookWhereUniqueInput)
    connect?: Array<Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>>;
}
