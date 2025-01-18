import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';
import { StringNullableListFilter } from '../prisma/string-nullable-list-filter.input';
import { IntNullableWithAggregatesFilter } from '../prisma/int-nullable-with-aggregates-filter.input';
import { BoolWithAggregatesFilter } from '../prisma/bool-with-aggregates-filter.input';
import { DecimalNullableWithAggregatesFilter } from '../prisma/decimal-nullable-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class RecipeScalarWhereWithAggregatesInput {

    @Field(() => [RecipeScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => RecipeScalarWhereWithAggregatesInput)
    AND?: Array<RecipeScalarWhereWithAggregatesInput>;

    @Field(() => [RecipeScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => RecipeScalarWhereWithAggregatesInput)
    OR?: Array<RecipeScalarWhereWithAggregatesInput>;

    @Field(() => [RecipeScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => RecipeScalarWhereWithAggregatesInput)
    NOT?: Array<RecipeScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    description?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    directions?: StringNullableWithAggregatesFilter;

    @Field(() => StringNullableListFilter, {nullable:true})
    ingredients?: StringNullableListFilter;

    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    prepTime?: IntNullableWithAggregatesFilter;

    @Field(() => IntNullableWithAggregatesFilter, {nullable:true})
    cookTime?: IntNullableWithAggregatesFilter;

    @Field(() => BoolWithAggregatesFilter, {nullable:true})
    isPublic?: BoolWithAggregatesFilter;

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
