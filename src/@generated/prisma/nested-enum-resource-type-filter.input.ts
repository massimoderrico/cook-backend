import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ResourceType } from './resource-type.enum';

@InputType()
export class NestedEnumResourceTypeFilter {

    @Field(() => ResourceType, {nullable:true})
    equals?: keyof typeof ResourceType;

    @Field(() => [ResourceType], {nullable:true})
    in?: Array<keyof typeof ResourceType>;

    @Field(() => [ResourceType], {nullable:true})
    notIn?: Array<keyof typeof ResourceType>;

    @Field(() => NestedEnumResourceTypeFilter, {nullable:true})
    not?: NestedEnumResourceTypeFilter;
}
