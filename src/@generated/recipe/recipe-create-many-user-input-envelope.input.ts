import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RecipeCreateManyUserInput } from './recipe-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class RecipeCreateManyUserInputEnvelope {

    @Field(() => [RecipeCreateManyUserInput], {nullable:false})
    @Type(() => RecipeCreateManyUserInput)
    data!: Array<RecipeCreateManyUserInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
