import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CommunityScalarWhereInput } from './community-scalar-where.input';
import { Type } from 'class-transformer';
import { CommunityUpdateManyMutationInput } from './community-update-many-mutation.input';

@InputType()
export class CommunityUpdateManyWithWhereWithoutCookbooksInput {

    @Field(() => CommunityScalarWhereInput, {nullable:false})
    @Type(() => CommunityScalarWhereInput)
    where!: CommunityScalarWhereInput;

    @Field(() => CommunityUpdateManyMutationInput, {nullable:false})
    @Type(() => CommunityUpdateManyMutationInput)
    data!: CommunityUpdateManyMutationInput;
}
