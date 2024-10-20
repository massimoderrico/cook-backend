import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { CookbookUpdateManyMutationInput } from './cookbook-update-many-mutation.input';
import { Type } from 'class-transformer';
import { CookbookWhereInput } from './cookbook-where.input';

@ArgsType()
export class UpdateManyCookbookArgs {

    @Field(() => CookbookUpdateManyMutationInput, {nullable:false})
    @Type(() => CookbookUpdateManyMutationInput)
    data!: CookbookUpdateManyMutationInput;

    @Field(() => CookbookWhereInput, {nullable:true})
    @Type(() => CookbookWhereInput)
    where?: CookbookWhereInput;
}
