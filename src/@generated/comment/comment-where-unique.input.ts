import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { CommentWhereInput } from './comment-where.input';
import { Type } from 'class-transformer';
import { StringFilter } from '../prisma/string-filter.input';
import { DecimalNullableFilter } from '../prisma/decimal-nullable-filter.input';
import { IntFilter } from '../prisma/int-filter.input';
import { EnumResourceTypeFilter } from '../prisma/enum-resource-type-filter.input';
import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { UserRelationFilter } from '../user/user-relation-filter.input';

@InputType()
export class CommentWhereUniqueInput {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => [CommentWhereInput], {nullable:true})
    @Type(() => CommentWhereInput)
    AND?: Array<CommentWhereInput>;

    @Field(() => [CommentWhereInput], {nullable:true})
    @Type(() => CommentWhereInput)
    OR?: Array<CommentWhereInput>;

    @Field(() => [CommentWhereInput], {nullable:true})
    @Type(() => CommentWhereInput)
    NOT?: Array<CommentWhereInput>;

    @Field(() => StringFilter, {nullable:true})
    description?: StringFilter;

    @Field(() => DecimalNullableFilter, {nullable:true})
    @Type(() => DecimalNullableFilter)
    rating?: DecimalNullableFilter;

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

    @Field(() => UserRelationFilter, {nullable:true})
    @Type(() => UserRelationFilter)
    user?: UserRelationFilter;
}
