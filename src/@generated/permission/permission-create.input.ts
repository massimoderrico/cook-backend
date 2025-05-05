import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PermissionLevel } from '../prisma/permission-level.enum';
import { Int } from '@nestjs/graphql';
import { ResourceType } from '../prisma/resource-type.enum';

@InputType()
export class PermissionCreateInput {

    @Field(() => PermissionLevel, {nullable:false})
    permissionLevel!: keyof typeof PermissionLevel;

    @Field(() => String, {nullable:false})
    userId!: string;

    @Field(() => Int, {nullable:false})
    resourceId!: number;

    @Field(() => ResourceType, {nullable:false})
    resourceType!: keyof typeof ResourceType;

    @Field(() => Date, {nullable:true})
    createdAt?: Date | string;

    @Field(() => Date, {nullable:true})
    updatedAt?: Date | string;
}
