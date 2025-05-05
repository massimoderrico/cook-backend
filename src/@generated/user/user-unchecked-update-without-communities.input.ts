import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { EnumRoleFieldUpdateOperationsInput } from '../prisma/enum-role-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { RecipeUncheckedUpdateManyWithoutUserNestedInput } from '../recipe/recipe-unchecked-update-many-without-user-nested.input';
import { Type } from 'class-transformer';
import { CookbookUncheckedUpdateManyWithoutUserNestedInput } from '../cookbook/cookbook-unchecked-update-many-without-user-nested.input';
import { CommentUncheckedUpdateManyWithoutUserNestedInput } from '../comment/comment-unchecked-update-many-without-user-nested.input';

@InputType()
export class UserUncheckedUpdateWithoutCommunitiesInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    id?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: NullableStringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    image?: NullableStringFieldUpdateOperationsInput;

    @Field(() => EnumRoleFieldUpdateOperationsInput, {nullable:true})
    role?: EnumRoleFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    mainCookbookId?: NullableIntFieldUpdateOperationsInput;

    @Field(() => RecipeUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    @Type(() => RecipeUncheckedUpdateManyWithoutUserNestedInput)
    recipes?: RecipeUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => CookbookUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    @Type(() => CookbookUncheckedUpdateManyWithoutUserNestedInput)
    cookbooks?: CookbookUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => CommentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    @Type(() => CommentUncheckedUpdateManyWithoutUserNestedInput)
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput;
}
