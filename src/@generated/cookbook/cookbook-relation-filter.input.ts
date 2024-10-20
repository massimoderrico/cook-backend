import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CookbookWhereInput } from './cookbook-where.input';
import { Type } from 'class-transformer';

@InputType()
export class CookbookRelationFilter {

    @Field(() => CookbookWhereInput, {nullable:true})
    @Type(() => CookbookWhereInput)
    is?: CookbookWhereInput;

    @Field(() => CookbookWhereInput, {nullable:true})
    @Type(() => CookbookWhereInput)
    isNot?: CookbookWhereInput;
}
