import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { RecipeUncheckedUpdateManyWithoutCommunitiesNestedInput } from '../recipe/recipe-unchecked-update-many-without-communities-nested.input';
import { Type } from 'class-transformer';
import { CookbookUncheckedUpdateManyWithoutCommunitiesNestedInput } from '../cookbook/cookbook-unchecked-update-many-without-communities-nested.input';

@InputType()
export class CommunityUncheckedUpdateInput {

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

    @Field(() => CookbookUncheckedUpdateManyWithoutCommunitiesNestedInput, {nullable:true})
    @Type(() => CookbookUncheckedUpdateManyWithoutCommunitiesNestedInput)
    cookbooks?: CookbookUncheckedUpdateManyWithoutCommunitiesNestedInput;
}
