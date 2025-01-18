import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';
import { DecimalNullableWithAggregatesFilter } from '../prisma/decimal-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class CookbookScalarWhereWithAggregatesInput {

    @Field(() => [CookbookScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => CookbookScalarWhereWithAggregatesInput)
    AND?: Array<CookbookScalarWhereWithAggregatesInput>;

    @Field(() => [CookbookScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => CookbookScalarWhereWithAggregatesInput)
    OR?: Array<CookbookScalarWhereWithAggregatesInput>;

    @Field(() => [CookbookScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => CookbookScalarWhereWithAggregatesInput)
    NOT?: Array<CookbookScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    description?: StringNullableWithAggregatesFilter;

    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    isPublic?: BoolWithAggregatesFilter;

    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    isMainCookbook?: BoolWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    userId?: IntWithAggregatesFilter;

    @Field(() => DecimalNullableWithAggregatesFilter, {nullable:true})
    @Type(() => DecimalNullableWithAggregatesFilter)
    rating?: DecimalNullableWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    ratingsCount?: IntWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: DateTimeWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: DateTimeWithAggregatesFilter;
}
