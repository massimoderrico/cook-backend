import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntWithAggregatesFilter } from '../prisma/int-with-aggregates-filter.input';
import { EnumPermissionLevelWithAggregatesFilter } from '../prisma/enum-permission-level-with-aggregates-filter.input';
import { StringWithAggregatesFilter } from '../prisma/string-with-aggregates-filter.input';
import { EnumResourceTypeWithAggregatesFilter } from '../prisma/enum-resource-type-with-aggregates-filter.input';
import { DateTimeWithAggregatesFilter } from '../prisma/date-time-with-aggregates-filter.input';

@InputType()
export class PermissionScalarWhereWithAggregatesInput {

    @Field(() => [PermissionScalarWhereWithAggregatesInput], {nullable:true})
    AND?: Array<PermissionScalarWhereWithAggregatesInput>;

    @Field(() => [PermissionScalarWhereWithAggregatesInput], {nullable:true})
    OR?: Array<PermissionScalarWhereWithAggregatesInput>;

    @Field(() => [PermissionScalarWhereWithAggregatesInput], {nullable:true})
    NOT?: Array<PermissionScalarWhereWithAggregatesInput>;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    id?: IntWithAggregatesFilter;

    @Field(() => EnumPermissionLevelWithAggregatesFilter, {nullable:true})
    permissionLevel?: EnumPermissionLevelWithAggregatesFilter;

    @Field(() => StringWithAggregatesFilter, {nullable:true})
    userId?: StringWithAggregatesFilter;

    @Field(() => IntWithAggregatesFilter, {nullable:true})
    resourceId?: IntWithAggregatesFilter;

    @Field(() => EnumResourceTypeWithAggregatesFilter, {nullable:true})
    resourceType?: EnumResourceTypeWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    createdAt?: DateTimeWithAggregatesFilter;

    @Field(() => DateTimeWithAggregatesFilter, {nullable:true})
    updatedAt?: DateTimeWithAggregatesFilter;
}
