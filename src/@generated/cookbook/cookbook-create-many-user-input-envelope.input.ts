import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CookbookCreateManyUserInput } from './cookbook-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class CookbookCreateManyUserInputEnvelope {

    @Field(() => [CookbookCreateManyUserInput], {nullable:false})
    @Type(() => CookbookCreateManyUserInput)
    data!: Array<CookbookCreateManyUserInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
