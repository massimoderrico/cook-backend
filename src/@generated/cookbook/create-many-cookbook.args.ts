import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CookbookCreateManyInput } from './cookbook-create-many.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateManyCookbookArgs {

    @Field(() => [CookbookCreateManyInput], {nullable:false})
    @Type(() => CookbookCreateManyInput)
    data!: Array<CookbookCreateManyInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
