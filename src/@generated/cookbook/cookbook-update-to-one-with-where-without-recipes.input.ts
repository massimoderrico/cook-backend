import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CookbookWhereInput } from './cookbook-where.input';
import { Type } from 'class-transformer';
import { CookbookUpdateWithoutRecipesInput } from './cookbook-update-without-recipes.input';

@InputType()
export class CookbookUpdateToOneWithWhereWithoutRecipesInput {

    @Field(() => CookbookWhereInput, {nullable:true})
    @Type(() => CookbookWhereInput)
    where?: CookbookWhereInput;

    @Field(() => CookbookUpdateWithoutRecipesInput, {nullable:false})
    @Type(() => CookbookUpdateWithoutRecipesInput)
    data!: CookbookUpdateWithoutRecipesInput;
}
