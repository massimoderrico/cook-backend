import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';
import { BoolFilter } from '../prisma/bool-filter.input';
import { DecimalNullableFilter } from '../prisma/decimal-nullable-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class CookbookScalarWhereInput {

    @Field(() => [CookbookScalarWhereInput], {nullable:true})
    @Type(() => CookbookScalarWhereInput)
    AND?: Array<CookbookScalarWhereInput>;

    @Field(() => [CookbookScalarWhereInput], {nullable:true})
    @Type(() => CookbookScalarWhereInput)
    OR?: Array<CookbookScalarWhereInput>;

    @Field(() => [CookbookScalarWhereInput], {nullable:true})
    @Type(() => CookbookScalarWhereInput)
    NOT?: Array<CookbookScalarWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    description?: StringNullableFilter;

    @Field(() => BoolFilter, {nullable:true})
    isPublic?: BoolFilter;

    @Field(() => BoolFilter, {nullable:true})
    isMainCookbook?: BoolFilter;

    @Field(() => StringFilter, {nullable:true})
    userId?: StringFilter;

    @Field(() => DecimalNullableFilter, {nullable:true})
    @Type(() => DecimalNullableFilter)
    rating?: DecimalNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    ratingsCount?: IntFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;
}
