import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { RecipeCreateManyCookbookInput } from './recipe-create-many-cookbook.input';
import { Type } from 'class-transformer';

@InputType()
export class RecipeCreateManyCookbookInputEnvelope {

    @Field(() => [RecipeCreateManyCookbookInput], {nullable:false})
    @Type(() => RecipeCreateManyCookbookInput)
    data!: Array<RecipeCreateManyCookbookInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
