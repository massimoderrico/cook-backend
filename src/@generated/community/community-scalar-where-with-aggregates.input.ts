import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { StringNullableWithAggregatesFilter } from '../prisma/string-nullable-with-aggregates-filter.input';

@InputType()
export class CommunityScalarWhereWithAggregatesInput {

    @Field(() => [CommunityScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<CommunityScalarWhereWithAggregatesInput>;

    @Field(() => [CommunityScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<CommunityScalarWhereWithAggregatesInput>;

    @Field(() => [CommunityScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<CommunityScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    name?: StringWithAggregatesFilter;

    @Field(() => StringNullableWithAggregatesFilter, {nullable:true})
    description?: StringNullableWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    userId?: IntWithAggregatesFilter;
}
