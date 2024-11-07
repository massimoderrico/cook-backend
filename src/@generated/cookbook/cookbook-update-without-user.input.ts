import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { NullableDecimalFieldUpdateOperationsInput } from '../prisma/nullable-decimal-field-update-operations.input';
import { Type } from 'class-transformer';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { RecipeUpdateManyWithoutCookbookNestedInput } from '../recipe/recipe-update-many-without-cookbook-nested.input';
import { CommunityUpdateManyWithoutCookbooksNestedInput } from '../community/community-update-many-without-cookbooks-nested.input';

@InputType()
export class CookbookUpdateWithoutUserInput {

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

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => RecipeUpdateManyWithoutCookbookNestedInput, {nullable:true})
    @Type(() => RecipeUpdateManyWithoutCookbookNestedInput)
    recipes?: RecipeUpdateManyWithoutCookbookNestedInput;

    @Field(() => CommunityUpdateManyWithoutCookbooksNestedInput, {nullable:true})
    @Type(() => CommunityUpdateManyWithoutCookbooksNestedInput)
    communities?: CommunityUpdateManyWithoutCookbooksNestedInput;
}
