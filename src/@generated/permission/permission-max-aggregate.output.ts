import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Int } from '@nestjs/graphql';
import { PermissionLevel } from '../prisma/permission-level.enum';
import { ResourceType } from '../prisma/resource-type.enum';

@ObjectType()
export class PermissionMaxAggregate {

    @Field(() => Int, {nullable:true})
    id?: number;

    @Field(() => PermissionLevel, {nullable:true})
    permissionLevel?: keyof typeof PermissionLevel;

    @Field(() => String, {nullable:true})
    userId?: string;

    @Field(() => Int, {nullable:true})
    resourceId?: number;

    @Field(() => ResourceType, {nullable:true})
    resourceType?: keyof typeof ResourceType;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}
