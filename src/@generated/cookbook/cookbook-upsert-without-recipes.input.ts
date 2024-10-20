import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CookbookUpdateWithoutRecipesInput } from './cookbook-update-without-recipes.input';
import { Type } from 'class-transformer';
import { CookbookCreateWithoutRecipesInput } from './cookbook-create-without-recipes.input';
import { CookbookWhereInput } from './cookbook-where.input';

@InputType()
export class CookbookUpsertWithoutRecipesInput {

    @Field(() => CookbookUpdateWithoutRecipesInput, {nullable:false})
    @Type(() => CookbookUpdateWithoutRecipesInput)
    update!: CookbookUpdateWithoutRecipesInput;

    @Field(() => CookbookCreateWithoutRecipesInput, {nullable:false})
    @Type(() => CookbookCreateWithoutRecipesInput)
    create!: CookbookCreateWithoutRecipesInput;

    @Field(() => CookbookWhereInput, {nullable:true})
    @Type(() => CookbookWhereInput)
    where?: CookbookWhereInput;
}
