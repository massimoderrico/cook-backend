import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { RecipeUpdatedirectionsInput } from './recipe-updatedirections.input';
import { Type } from 'class-transformer';
import { RecipeUpdateingredientsInput } from './recipe-updateingredients.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { BoolFieldUpdateOperationsInput } from '../prisma/bool-field-update-operations.input';
import { NullableDecimalFieldUpdateOperationsInput } from '../prisma/nullable-decimal-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { CookbookUncheckedUpdateManyWithoutRecipesNestedInput } from '../cookbook/cookbook-unchecked-update-many-without-recipes-nested.input';
import { CommunityUncheckedUpdateManyWithoutRecipesNestedInput } from '../community/community-unchecked-update-many-without-recipes-nested.input';

@InputType()
export class RecipeUncheckedUpdateInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    id?: IntFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: NullableStringFieldUpdateOperationsInput;

    @Field(() => RecipeUpdatedirectionsInput, {nullable:true})
    @Type(() => RecipeUpdatedirectionsInput)
    directions?: RecipeUpdatedirectionsInput;

    @Field(() => RecipeUpdateingredientsInput, {nullable:true})
    @Type(() => RecipeUpdateingredientsInput)
    ingredients?: RecipeUpdateingredientsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    prepTime?: NullableIntFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    cookTime?: NullableIntFieldUpdateOperationsInput;

    @Field(() => BoolFieldUpdateOperationsInput, {nullable:true})
    isPublic?: BoolFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: StringFieldUpdateOperationsInput;

    @Field(() => NullableDecimalFieldUpdateOperationsInput, {nullable:true})
    @Type(() => NullableDecimalFieldUpdateOperationsInput)
    rating?: NullableDecimalFieldUpdateOperationsInput;

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    ratingsCount?: IntFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    image?: NullableStringFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => CookbookUncheckedUpdateManyWithoutRecipesNestedInput, {nullable:true})
    @Type(() => CookbookUncheckedUpdateManyWithoutRecipesNestedInput)
    cookbook?: CookbookUncheckedUpdateManyWithoutRecipesNestedInput;

    @Field(() => CommunityUncheckedUpdateManyWithoutRecipesNestedInput, {nullable:true})
    @Type(() => CommunityUncheckedUpdateManyWithoutRecipesNestedInput)
    communities?: CommunityUncheckedUpdateManyWithoutRecipesNestedInput;
}
