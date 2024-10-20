import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ResourceType } from './resource-type.enum';

@InputType()
export class EnumResourceTypeFieldUpdateOperationsInput {

    @Field(() => ResourceType, {nullable:true})
    set?: keyof typeof ResourceType;
}
