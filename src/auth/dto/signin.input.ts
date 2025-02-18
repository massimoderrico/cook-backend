import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType()
export class SignUpInput {
  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  password: string;
}

@ObjectType()
export class SignInResponse {
  @Field()
  accessToken: string;

  @Field()
  userId: number;

  @Field()
  email: string;

  @Field()
  username: string;
}

