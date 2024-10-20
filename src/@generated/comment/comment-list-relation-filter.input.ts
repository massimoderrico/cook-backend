import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommentWhereInput } from './comment-where.input';
import { Type } from 'class-transformer';

@InputType()
export class CommentListRelationFilter {

    @Field(() => CommentWhereInput, {nullable:true})
    @Type(() => CommentWhereInput)
    every?: CommentWhereInput;

    @Field(() => CommentWhereInput, {nullable:true})
    @Type(() => CommentWhereInput)
    some?: CommentWhereInput;

    @Field(() => CommentWhereInput, {nullable:true})
    @Type(() => CommentWhereInput)
    none?: CommentWhereInput;
}
