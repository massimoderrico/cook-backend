import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutCommunitiesInput } from './user-update-without-communities.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCommunitiesInput } from './user-create-without-communities.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutCommunitiesInput {

    @Field(() => UserUpdateWithoutCommunitiesInput, {nullable:false})
    @Type(() => UserUpdateWithoutCommunitiesInput)
    update!: UserUpdateWithoutCommunitiesInput;

    @Field(() => UserCreateWithoutCommunitiesInput, {nullable:false})
    @Type(() => UserCreateWithoutCommunitiesInput)
    create!: UserCreateWithoutCommunitiesInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
