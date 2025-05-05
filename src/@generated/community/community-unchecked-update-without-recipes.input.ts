import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFieldUpdateOperationsInput } from '../prisma/int-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { CookbookUncheckedUpdateManyWithoutCommunitiesNestedInput } from '../cookbook/cookbook-unchecked-update-many-without-communities-nested.input';
import { Type } from 'class-transformer';

@InputType()
export class CommunityUncheckedUpdateWithoutRecipesInput {

    @Field(() => IntFieldUpdateOperationsInput, {nullable:true})
    id?: IntFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: NullableStringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    userId?: StringFieldUpdateOperationsInput;

    @Field(() => CookbookUncheckedUpdateManyWithoutCommunitiesNestedInput, {nullable:true})
    @Type(() => CookbookUncheckedUpdateManyWithoutCommunitiesNestedInput)
    cookbooks?: CookbookUncheckedUpdateManyWithoutCommunitiesNestedInput;
}
