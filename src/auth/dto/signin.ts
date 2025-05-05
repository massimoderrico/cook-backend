import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class SignInResponse {
  @Field(() => String, { nullable: true })
  accessToken?: string;

  @Field(() => String, { nullable: true })
  refreshToken?: string;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => String, { nullable: true })
  email?: string;
}

@InputType()
export class SignUpInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}