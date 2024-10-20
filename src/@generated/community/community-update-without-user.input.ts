import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { StringFieldUpdateOperationsInput } from '../prisma/string-field-update-operations.input';
import { NullableStringFieldUpdateOperationsInput } from '../prisma/nullable-string-field-update-operations.input';
import { RecipeUpdateManyWithoutCommunitiesNestedInput } from '../recipe/recipe-update-many-without-communities-nested.input';
import { Type } from 'class-transformer';
import { CookbookUpdateManyWithoutCommunitiesNestedInput } from '../cookbook/cookbook-update-many-without-communities-nested.input';

@InputType()
export class CommunityUpdateWithoutUserInput {

    @Field(() => StringFieldUpdateOperationsInput, {nullable:true})
    name?: StringFieldUpdateOperationsInput;

    @Field(() => NullableStringFieldUpdateOperationsInput, {nullable:true})
    description?: NullableStringFieldUpdateOperationsInput;

    @Field(() => RecipeUpdateManyWithoutCommunitiesNestedInput, {nullable:true})
    @Type(() => RecipeUpdateManyWithoutCommunitiesNestedInput)
    recipes?: RecipeUpdateManyWithoutCommunitiesNestedInput;

    @Field(() => CookbookUpdateManyWithoutCommunitiesNestedInput, {nullable:true})
    @Type(() => CookbookUpdateManyWithoutCommunitiesNestedInput)
    cookbooks?: CookbookUpdateManyWithoutCommunitiesNestedInput;
}
