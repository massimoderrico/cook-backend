import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CommunityWhereInput } from './community-where.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteManyCommunityArgs {

    @Field(() => CommunityWhereInput, {nullable:true})
    @Type(() => CommunityWhereInput)
    where?: CommunityWhereInput;
}
