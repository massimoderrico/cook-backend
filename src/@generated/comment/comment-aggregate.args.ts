import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CommentWhereInput } from './comment-where.input';
import { Type } from 'class-transformer';
import { CommentOrderByWithRelationInput } from './comment-order-by-with-relation.input';
import { Prisma } from '@prisma/client';
import { CommentWhereUniqueInput } from './comment-where-unique.input';
import { Int } from '@nestjs/graphql';
import { CommentCountAggregateInput } from './comment-count-aggregate.input';
import { CommentAvgAggregateInput } from './comment-avg-aggregate.input';
import { CommentSumAggregateInput } from './comment-sum-aggregate.input';
import { CommentMinAggregateInput } from './comment-min-aggregate.input';
import { CommentMaxAggregateInput } from './comment-max-aggregate.input';

@ArgsType()
export class CommentAggregateArgs {

    @Field(() => CommentWhereInput, {nullable:true})
    @Type(() => CommentWhereInput)
    where?: CommentWhereInput;

    @Field(() => [CommentOrderByWithRelationInput], {nullable:true})
    @Type(() => CommentOrderByWithRelationInput)
    orderBy?: Array<CommentOrderByWithRelationInput>;

    @Field(() => CommentWhereUniqueInput, {nullable:true})
    @Type(() => CommentWhereUniqueInput)
    cursor?: Prisma.AtLeast<CommentWhereUniqueInput, 'id'>;

    @Field(() => Int, {nullable:true})
    take?: number;

    @Field(() => Int, {nullable:true})
    skip?: number;

    @Field(() => CommentCountAggregateInput, {nullable:true})
    @Type(() => CommentCountAggregateInput)
    _count?: CommentCountAggregateInput;

    @Field(() => CommentAvgAggregateInput, {nullable:true})
    @Type(() => CommentAvgAggregateInput)
    _avg?: CommentAvgAggregateInput;

    @Field(() => CommentSumAggregateInput, {nullable:true})
    @Type(() => CommentSumAggregateInput)
    _sum?: CommentSumAggregateInput;

    @Field(() => CommentMinAggregateInput, {nullable:true})
    @Type(() => CommentMinAggregateInput)
    _min?: CommentMinAggregateInput;

    @Field(() => CommentMaxAggregateInput, {nullable:true})
    @Type(() => CommentMaxAggregateInput)
    _max?: CommentMaxAggregateInput;
}
