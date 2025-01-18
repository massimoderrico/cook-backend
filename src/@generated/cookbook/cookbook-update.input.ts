import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { NullableDecimalFieldUpdateOperationsInput } from '../prisma/nullable-decimal-field-update-operations.input';
import { Type } from 'class-transformer';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { UserUpdateOneRequiredWithoutCookbooksNestedInput } from '../user/user-update-one-required-without-cookbooks-nested.input';
import { RecipeUpdateManyWithoutCookbookNestedInput } from '../recipe/recipe-update-many-without-cookbook-nested.input';
import { CommunityUpdateManyWithoutCookbooksNestedInput } from '../community/community-update-many-without-cookbooks-nested.input';

@InputType()
export class CookbookUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: NullableStringFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isPublic?: BoolFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isMainCookbook?: BoolFieldUpdateOperationsInput;

    @Field(() => NullableDecimalFieldUpdateOperationsInput, {nullable:true})
    @Type(() => NullableDecimalFieldUpdateOperationsInput)
    rating?: NullableDecimalFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    ratingsCount?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneRequiredWithoutCookbooksNestedInput, {nullable:true})
    @Type(() => UserUpdateOneRequiredWithoutCookbooksNestedInput)
    user?: UserUpdateOneRequiredWithoutCookbooksNestedInput;

    @Field(() => RecipeUpdateManyWithoutCookbookNestedInput, {nullable:true})
    @Type(() => RecipeUpdateManyWithoutCookbookNestedInput)
    recipes?: RecipeUpdateManyWithoutCookbookNestedInput;

    @Field(() => CommunityUpdateManyWithoutCookbooksNestedInput, {nullable:true})
    @Type(() => CommunityUpdateManyWithoutCookbooksNestedInput)
    communities?: CommunityUpdateManyWithoutCookbooksNestedInput;
}
