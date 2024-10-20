import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CookbookWhereInput } from './cookbook-where.input';
import { Type } from 'class-transformer';
import { CookbookOrderByWithRelationInput } from './cookbook-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { CookbookWhereUniqueInput } from './cookbook-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CookbookScalarFieldEnum } from './cookbook-scalar-field.enum';

@ArgsType()
export class FindFirstCookbookOrThrowArgs {

    @Field(() => CookbookWhereInput, {nullable:true})
    @Type(() => CookbookWhereInput)
    where?: CookbookWhereInput;

    @Field(() => [CookbookOrderByWithRelationInput], {nullable:true})
    @Type(() => CookbookOrderByWithRelationInput)
    orderBy?: Array<CookbookOrderByWithRelationInput>;

    @Field(() => CookbookWhereUniqueInput, {nullable:true})
    @Type(() => CookbookWhereUniqueInput)
    cursor?: Prisma.AtLeast<CookbookWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => [CookbookScalarFieldEnum], {nullable:true})
    distinct?: Array<keyof typeof CookbookScalarFieldEnum>;
}
