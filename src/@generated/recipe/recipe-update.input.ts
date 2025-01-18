import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { RecipeUpdateingredientsInput } from './recipe-updateingredients.input';
import { Type } from 'class-transformer';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { NullableDecimalFieldUpdateOperationsInput } from '../prisma/nullable-decimal-field-update-operations.input';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { UserUpdateOneRequiredWithoutRecipesNestedInput } from '../user/user-update-one-required-without-recipes-nested.input';
import { CookbookUpdateManyWithoutRecipesNestedInput } from '../cookbook/cookbook-update-many-without-recipes-nested.input';
import { CommunityUpdateManyWithoutRecipesNestedInput } from '../community/community-update-many-without-recipes-nested.input';

@InputType()
export class RecipeUpdateInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    directions?: NullableStringFieldUpdateOperationsInput;

    @Field(() => RecipeUpdateingredientsInput, {nullable:true})
    @Type(() => RecipeUpdateingredientsInput)
    ingredients?: RecipeUpdateingredientsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    prepTime?: NullableIntFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    cookTime?: NullableIntFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isPublic?: BoolFieldUpdateOperationsInput;

    @Field(() => NullableDecimalFieldUpdateOperationsInput, {nullable:true})
    @Type(() => NullableDecimalFieldUpdateOperationsInput)
    rating?: NullableDecimalFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    ratingsCount?: IntFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => UserUpdateOneRequiredWithoutRecipesNestedInput, {nullable:true})
    @Type(() => UserUpdateOneRequiredWithoutRecipesNestedInput)
    user?: UserUpdateOneRequiredWithoutRecipesNestedInput;

    @Field(() => CookbookUpdateManyWithoutRecipesNestedInput, {nullable:true})
    @Type(() => CookbookUpdateManyWithoutRecipesNestedInput)
    cookbook?: CookbookUpdateManyWithoutRecipesNestedInput;

    @Field(() => CommunityUpdateManyWithoutRecipesNestedInput, {nullable:true})
    @Type(() => CommunityUpdateManyWithoutRecipesNestedInput)
    communities?: CommunityUpdateManyWithoutRecipesNestedInput;
}
