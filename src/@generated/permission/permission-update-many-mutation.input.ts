import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { EnumPermissionLevelFieldUpdateOperationsInput } from '../prisma/enum-permission-level-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { EnumResourceTypeFieldUpdateOperationsInput } from '../prisma/enum-resource-type-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';

@InputType()
export class PermissionUpdateManyMutationInput {

    @Field(() => EnumPermissionLevelFieldUpdateOperationsInput, {nullable:true})
    permissionLevel?: EnumPermissionLevelFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    userId?: IntFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    resourceId?: IntFieldUpdateOperationsInput;

    @Field(() => EnumResourceTypeFieldUpdateOperationsInput, {nullable:true})
    resourceType?: EnumResourceTypeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: DateTimeFieldUpdateOperationsInput;
}
