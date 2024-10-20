import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { RecipeUncheckedUpdateManyWithoutCommunitiesNestedInput } from '../recipe/recipe-unchecked-update-many-without-communities-nested.input';
import { Type } from 'class-transformer';

@InputType()
export class CommunityUncheckedUpdateWithoutCookbooksInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    id?: IntFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: NullableStringFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    userId?: IntFieldUpdateOperationsInput;

    @Field(() => RecipeUncheckedUpdateManyWithoutCommunitiesNestedInput, {nullable:true})
    @Type(() => RecipeUncheckedUpdateManyWithoutCommunitiesNestedInput)
    recipes?: RecipeUncheckedUpdateManyWithoutCommunitiesNestedInput;
}
