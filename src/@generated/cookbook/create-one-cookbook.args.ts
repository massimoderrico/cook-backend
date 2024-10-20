import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CookbookCreateInput } from './cookbook-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneCookbookArgs {

    @Field(() => CookbookCreateInput, {nullable:false})
    @Type(() => CookbookCreateInput)
    data!: CookbookCreateInput;
}
