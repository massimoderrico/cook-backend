import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { CookbookScalarWhereInput } from './cookbook-scalar-where.input';
import { Type } from 'class-transformer';
import { CookbookUpdateManyMutationInput } from './cookbook-update-many-mutation.input';

@InputType()
export class CookbookUpdateManyWithWhereWithoutUserInput {

    @Field(() => CookbookScalarWhereInput, {nullable:false})
    @Type(() => CookbookScalarWhereInput)
    where!: CookbookScalarWhereInput;

    @Field(() => CookbookUpdateManyMutationInput, {nullable:false})
    @Type(() => CookbookUpdateManyMutationInput)
    data!: CookbookUpdateManyMutationInput;
}
