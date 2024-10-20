import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { UserWhereInput } from './user-where.input';
import { Type } from 'class-transformer';
import { UserUpdateWithoutCookbooksInput } from './user-update-without-cookbooks.input';

@InputType()
export class UserUpdateToOneWithWhereWithoutCookbooksInput {

    @Field(() => UserWhereInput, {nullable:true})
    @Type(() => UserWhereInput)
    where?: UserWhereInput;

    @Field(() => UserUpdateWithoutCookbooksInput, {nullable:false})
    @Type(() => UserUpdateWithoutCookbooksInput)
    data!: UserUpdateWithoutCookbooksInput;
}
