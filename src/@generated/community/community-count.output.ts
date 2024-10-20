import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';

@ObjectType()
export class CommunityCount {

    @Field(() => Int, {nullable:false})
    recipes?: number;

    @Field(() => Int, {nullable:false})
    cookbooks?: number;
}
