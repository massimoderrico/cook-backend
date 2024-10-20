import { Field } from '@nestjs/graphql';
import { InputType } from '@nestjs/graphql';
import { IntFilter } from '../prisma/int-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { StringNullableFilter } from '../prisma/string-nullable-filter.input';

@InputType()
export class CommunityScalarWhereInput {

    @Field(() => [CommunityScalarWhereInput], {nullable:true})
    AND?: Array<CommunityScalarWhereInput>;

    @Field(() => [CommunityScalarWhereInput], {nullable:true})
    OR?: Array<CommunityScalarWhereInput>;

    @Field(() => [CommunityScalarWhereInput], {nullable:true})
    NOT?: Array<CommunityScalarWhereInput>;

    @Field(() => IntFilter, {nullable:true})
    id?: IntFilter;

    @Field(() => StringFilter, {nullable:true})
    name?: StringFilter;

    @Field(() => StringNullableFilter, {nullable:true})
    description?: StringNullableFilter;

    @Field(() => IntFilter, {nullable:true})
    userId?: IntFilter;
}
