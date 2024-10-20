import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserUpdateWithoutCookbooksInput } from './user-update-without-cookbooks.input';
import { Type } from 'class-transformer';
import { UserCreateWithoutCookbooksInput } from './user-create-without-cookbooks.input';
import { UserWhereInput } from './user-where.input';

@InputType()
export class UserUpsertWithoutCookbooksInput {

    @Field(() => UserUpdateWithoutCookbooksInput, {nullable:false})
    @Type(() => UserUpdateWithoutCookbooksInput)
    update!: UserUpdateWithoutCookbooksInput;

    @Field(() => UserCreateWithoutCookbooksInput, {nullable:false})
    @Type(() => UserCreateWithoutCookbooksInput)
    create!: UserCreateWithoutCookbooksInput;

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;
}
