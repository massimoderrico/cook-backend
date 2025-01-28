import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableIntFieldUpdateOperationsInput } from '../prisma/nullable-int-field-update-operations.input';
import { EnumRoleFieldUpdateOperationsInput } from '../prisma/enum-role-field-update-operations.input';
import { DateTimeFieldUpdateOperationsInput } from '../prisma/date-time-field-update-operations.input';
import { CookbookUpdateManyWithoutUserNestedInput } from '../cookbook/cookbook-update-many-without-user-nested.input';
import { Type } from 'class-transformer';
import { CommunityUpdateManyWithoutUserNestedInput } from '../community/community-update-many-without-user-nested.input';
import { CommentUpdateManyWithoutUserNestedInput } from '../comment/comment-update-many-without-user-nested.input';

@InputType()
export class UserUpdateWithoutRecipesInput {

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    name?: NullableStringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    email?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    username?: StringFieldUpdateOperationsInput;

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    password?: StringFieldUpdateOperationsInput;

    @Field(() => NullableIntFieldUpdateOperationsInput, {nullable:true})
    mainCookbookId?: NullableIntFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    image?: NullableStringFieldUpdateOperationsInput;

    @Field(() => EnumRoleFieldUpdateOperationsInput, {nullable:true})
    role?: EnumRoleFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    createdAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => DateTimeFieldUpdateOperationsInput, {nullable:true})
    updatedAt?: DateTimeFieldUpdateOperationsInput;

    @Field(() => CookbookUpdateManyWithoutUserNestedInput, {nullable:true})
    @Type(() => CookbookUpdateManyWithoutUserNestedInput)
    cookbooks?: CookbookUpdateManyWithoutUserNestedInput;

    @Field(() => CommunityUpdateManyWithoutUserNestedInput, {nullable:true})
    @Type(() => CommunityUpdateManyWithoutUserNestedInput)
    communities?: CommunityUpdateManyWithoutUserNestedInput;

    @Field(() => CommentUpdateManyWithoutUserNestedInput, {nullable:true})
    @Type(() => CommentUpdateManyWithoutUserNestedInput)
    comments?: CommentUpdateManyWithoutUserNestedInput;
}
