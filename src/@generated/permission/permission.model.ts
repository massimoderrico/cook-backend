import { Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { ID } from '@nestjs/graphql';
import { PermissionLevel } from '../prisma/permission-level.enum';
import { Int } from '@nestjs/graphql';
import { ResourceType } from '../prisma/resource-type.enum';

@ObjectType()
export class Permission {

    @Field(() => ID, {nullable:false})
    id!: number;

    @Field(() => PermissionLevel, {nullable:false})
    permissionLevel!: keyof typeof PermissionLevel;

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
}
