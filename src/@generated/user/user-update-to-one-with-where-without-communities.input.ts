import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutCommunitiesInput } from './user-update-without-communities.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutCommunitiesInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutCommunitiesInput, {nullable:false})
    @Type(() => UserUpdateWithoutCommunitiesInput)
    data!: UserUpdateWithoutCommunitiesInput;
}
