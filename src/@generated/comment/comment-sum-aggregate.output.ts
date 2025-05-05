import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';

@ObjectType()
export class CommentSumAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => GraphQLDecimal, {nullable:true})
    rating?: Decimal;

    @Field(() => Int, {nullable:true})
    resourceId?: number;
}
