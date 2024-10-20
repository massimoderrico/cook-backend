import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { DecimalNullableWithAggregatesFilter } from '../prisma/decimal-nullable-with-aggregates-filter.input';
import { EnumResourceTypeWithAggregatesFilter } from '../prisma/enum-resource-type-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class CommentScalarWhereWithAggregatesInput {

    @Field(() => [CommentScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => CommentScalarWhereWithAggregatesInput)
    AND?: Array<CommentScalarWhereWithAggregatesInput>;

    @Field(() => [CommentScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => CommentScalarWhereWithAggregatesInput)
    OR?: Array<CommentScalarWhereWithAggregatesInput>;

    @Field(() => [CommentScalarWhereWithAggregatesInput], {nullable:true})
    @Type(() => CommentScalarWhereWithAggregatesInput)
    NOT?: Array<CommentScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    description?: StringWithAggregatesFilter;

    @Field(() => DecimalNullableWithAggregatesFilter, {nullable:true})
    @Type(() => DecimalNullableWithAggregatesFilter)
    rating?: DecimalNullableWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    userId?: IntWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    resourceId?: IntWithAggregatesFilter;

    @Field(() => EnumResourceTypeWithAggregatesFilter, {nullable:true})
    resourceType?: EnumResourceTypeWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: DateTimeWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: DateTimeWithAggregatesFilter;
}
