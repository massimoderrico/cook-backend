import { ObjectType, Field, InputType } from '@nestjs/graphql';

@ObjectType()
export class LoginResponse {
  @Field()
  accessToken: string;

  @Field()
  userId: number;

  @Field()
  email: string;
}

@InputType()
export class LoginInput {
  @Field()
  email: string;

  @Field()
  password: string;
}