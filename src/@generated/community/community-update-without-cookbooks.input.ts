import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { UserUpdateOneRequiredWithoutCommunitiesNestedInput } from '../user/user-update-one-required-without-communities-nested.input';
import { Type } from 'class-transformer';
import { RecipeUpdateManyWithoutCommunitiesNestedInput } from '../recipe/recipe-update-many-without-communities-nested.input';

@InputType()
export class CommunityUpdateWithoutCookbooksInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: NullableStringFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneRequiredWithoutCommunitiesNestedInput, {nullable:true})
    @Type(() => UserUpdateOneRequiredWithoutCommunitiesNestedInput)
    user?: UserUpdateOneRequiredWithoutCommunitiesNestedInput;

    @Field(() => RecipeUpdateManyWithoutCommunitiesNestedInput, {nullable:true})
    @Type(() => RecipeUpdateManyWithoutCommunitiesNestedInput)
    recipes?: RecipeUpdateManyWithoutCommunitiesNestedInput;
}
