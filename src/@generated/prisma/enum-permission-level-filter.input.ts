import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { PermissionLevel } from './permission-level.enum';
import { NestedEnumPermissionLevelFilter } from './nested-enum-permission-level-filter.input';

@InputType()
export class EnumPermissionLevelFilter {

    @Field(() => PermissionLevel, {nullable:true})
    equals?: keyof typeof PermissionLevel;

    @Field(() => [PermissionLevel], {nullable:true})
    in?: Array<keyof typeof PermissionLevel>;

    @Field(() => [PermissionLevel], {nullable:true})
    notIn?: Array<keyof typeof PermissionLevel>;

    @Field(() => NestedEnumPermissionLevelFilter, {nullable:true})
    not?: NestedEnumPermissionLevelFilter;
}
