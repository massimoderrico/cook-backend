import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommunityCreateManyUserInput } from './community-create-many-user.input';
import { Type } from 'class-transformer';

@InputType()
export class CommunityCreateManyUserInputEnvelope {

    @Field(() => [CommunityCreateManyUserInput], {nullable:false})
    @Type(() => CommunityCreateManyUserInput)
    data!: Array<CommunityCreateManyUserInput>;

    @Field(() => Boolean, {nullable:true})
    skipDuplicates?: boolean;
}
