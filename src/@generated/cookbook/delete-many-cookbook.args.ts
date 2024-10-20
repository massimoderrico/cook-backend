import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CookbookWhereInput } from './cookbook-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyCookbookArgs {

    @Field(() => CookbookWhereInput, {nullable:true})
    @Type(() => CookbookWhereInput)
    where?: CookbookWhereInput;
}
