import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { EnumRoleFieldUpdateOperationsInput } from '../prisma/enum-role-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { RecipeUncheckedUpdateManyWithoutUserNestedInput } from '../recipe/recipe-unchecked-update-many-without-user-nested.input';
import { Type } from 'class-transformer';
import { CommunityUncheckedUpdateManyWithoutUserNestedInput } from '../community/community-unchecked-update-many-without-user-nested.input';
import { CommentUncheckedUpdateManyWithoutUserNestedInput } from '../comment/comment-unchecked-update-many-without-user-nested.input';

@InputType()
export class UserUncheckedUpdateWithoutCookbooksInput {

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

    @Field(() => CommunityUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    @Type(() => CommunityUncheckedUpdateManyWithoutUserNestedInput)
    communities?: CommunityUncheckedUpdateManyWithoutUserNestedInput;

    @Field(() => CommentUncheckedUpdateManyWithoutUserNestedInput, {nullable:true})
    @Type(() => CommentUncheckedUpdateManyWithoutUserNestedInput)
    comments?: CommentUncheckedUpdateManyWithoutUserNestedInput;
}
