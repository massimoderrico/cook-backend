import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CookbookWhereInput } from './cookbook-where.input';
import { Type } from 'class-transformer';

@InputType()
export class CookbookListRelationFilter {

    @Field(() => CookbookWhereInput, {nullable:true})
    @Type(() => CookbookWhereInput)
    every?: CookbookWhereInput;

    @Field(() => CookbookWhereInput, {nullable:true})
    @Type(() => CookbookWhereInput)
    some?: CookbookWhereInput;

    @Field(() => CookbookWhereInput, {nullable:true})
    @Type(() => CookbookWhereInput)
    none?: CookbookWhereInput;
}
