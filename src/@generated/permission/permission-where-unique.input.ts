import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { PermissionWhereInput } from './permission-where.input';
import { EnumPermissionLevelFilter } from '../prisma/enum-permission-level-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { EnumResourceTypeFilter } from '../prisma/enum-resource-type-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';

@InputType()
export class PermissionWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => [PermissionWhereInput], {nullable:true})
    AND?: Array<PermissionWhereInput>;

    @Field(() => [PermissionWhereInput], {nullable:true})
    OR?: Array<PermissionWhereInput>;

    @Field(() => [PermissionWhereInput], {nullable:true})
    NOT?: Array<PermissionWhereInput>;

    @Field(() => EnumPermissionLevelFilter, {nullable:true})
    permissionLevel?: EnumPermissionLevelFilter;

    @Field(() => StringFilter, {nullable:true})
    userId?: StringFilter;

    @Field(() => IntFilter, {nullable:true})
    resourceId?: IntFilter;

    @Field(() => EnumResourceTypeFilter, {nullable:true})
    resourceType?: EnumResourceTypeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    createdAt?: DateTimeFilter;

    @Field(() => DateTimeFilter, {nullable:true})
    updatedAt?: DateTimeFilter;
}
