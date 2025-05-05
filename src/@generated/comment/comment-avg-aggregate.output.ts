import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';

@ObjectType()
export class CommentAvgAggregate {

    @Field(() => Float, {nullable:true})
    id?: number;

    @Field(() => GraphQLDecimal, {nullable:true})
    rating?: Decimal;

    @Field(() => Float, {nullable:true})
    resourceId?: number;
}
