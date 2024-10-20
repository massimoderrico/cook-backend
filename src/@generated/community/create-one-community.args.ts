import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CommunityCreateInput } from './community-create.input';
import { Type } from 'class-transformer';

@ArgsType()
export class CreateOneCommunityArgs {

    @Field(() => CommunityCreateInput, {nullable:false})
    @Type(() => CommunityCreateInput)
    data!: CommunityCreateInput;
}
