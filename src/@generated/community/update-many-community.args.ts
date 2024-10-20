import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CommunityUpdateManyMutationInput } from './community-update-many-mutation.input';
import { Type } from 'class-transformer';
import { CommunityWhereInput } from './community-where.input';

@ArgsType()
export class UpdateManyCommunityArgs {

    @Field(() => CommunityUpdateManyMutationInput, {nullable:false})
    @Type(() => CommunityUpdateManyMutationInput)
    data!: CommunityUpdateManyMutationInput;

    @Field(() => CommunityWhereInput, {nullable:true})
    @Type(() => CommunityWhereInput)
    where?: CommunityWhereInput;
}
