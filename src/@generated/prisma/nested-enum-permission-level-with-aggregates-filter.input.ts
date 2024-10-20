import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PermissionLevel } from './permission-level.enum';
import { NestedIntFilter } from './nested-int-filter.input';
import { NestedEnumPermissionLevelFilter } from './nested-enum-permission-level-filter.input';

@InputType()
export class NestedEnumPermissionLevelWithAggregatesFilter {

    @Field(() => PermissionLevel, {nullable:true})
    equals?: keyof typeof PermissionLevel;

    @Field(() => [PermissionLevel], {nullable:true})
    in?: Array<keyof typeof PermissionLevel>;

    @Field(() => [PermissionLevel], {nullable:true})
    notIn?: Array<keyof typeof PermissionLevel>;

    @Field(() => NestedEnumPermissionLevelWithAggregatesFilter, {nullable:true})
    not?: NestedEnumPermissionLevelWithAggregatesFilter;

    @Field(() => NestedIntFilter, {nullable:true})
    _count?: NestedIntFilter;

    @Field(() => NestedEnumPermissionLevelFilter, {nullable:true})
    _min?: NestedEnumPermissionLevelFilter;

    @Field(() => NestedEnumPermissionLevelFilter, {nullable:true})
    _max?: NestedEnumPermissionLevelFilter;
}
