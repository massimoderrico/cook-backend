import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommunityWhereInput } from './community-where.input';

@InputType()
export class CommunityListRelationFilter {

    @Field(() => CommunityWhereInput, {nullable:true})
    every?: CommunityWhereInput;

    @Field(() => CommunityWhereInput, {nullable:true})
    some?: CommunityWhereInput;

    @Field(() => CommunityWhereInput, {nullable:true})
    none?: CommunityWhereInput;
}
