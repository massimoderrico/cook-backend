import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { GraphQLDecimal } from 'prisma-graphql-type-decimal';
import { Decimal } from '@prisma/client/runtime/library';
import { Int } from '@nestjs/graphql';
import { ResourceType } from '../prisma/resource-type.enum';
import { User } from '../user/user.model';

@ObjectType()
export class Comment {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => String, {nullable:false})
    description!: string;

    @Field(() => GraphQLDecimal, {nullable:true})
    rating!: Decimal | null;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => Int, {nullable:false})
    resourceId!: number;

    @Field(() => ResourceType, {nullable:false})
    resourceType!: keyof typeof ResourceType;

    @Field(() => Date, {nullable:false})
    createdAt!: Date;

    @Field(() => Date, {nullable:false})
    updatedAt!: Date;

    @Field(() => User, {nullable:false})
    user?: User;
}
