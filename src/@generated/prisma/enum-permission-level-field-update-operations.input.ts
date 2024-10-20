import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PermissionLevel } from './permission-level.enum';

@InputType()
export class EnumPermissionLevelFieldUpdateOperationsInput {

    @Field(() => PermissionLevel, {nullable:true})
    set?: keyof typeof PermissionLevel;
}
