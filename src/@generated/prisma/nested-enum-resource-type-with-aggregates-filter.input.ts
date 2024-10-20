import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { ResourceType } from './resource-type.enum';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumResourceTypeFilter } from './nested-enum-resource-type-filter.input';

@InputType()
export class NestedEnumResourceTypeWithAggregatesFilter {

    @Field(() => ResourceType, {nullable:true})
    equals?: keyof typeof ResourceType;

    @Field(() => [ResourceType], {nullable:true})
    in?: Array<keyof typeof ResourceType>;

    @Field(() => [ResourceType], {nullable:true})
    notIn?: Array<keyof typeof ResourceType>;

    @Field(() => NestedEnumResourceTypeWithAggregatesFilter, {nullable:true})
    not?: NestedEnumResourceTypeWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumResourceTypeFilter, {nullable:true})
    _min?: NestedEnumResourceTypeFilter;

    @Field(() => NestedEnumResourceTypeFilter, {nullable:true})
    _max?: NestedEnumResourceTypeFilter;
}
