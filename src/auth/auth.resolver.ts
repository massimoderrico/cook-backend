import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, LoginResponse } from './dto/login.input';
import { SignupInput } from './dto/signup.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(@Args('data') loginData: LoginInput): Promise<LoginResponse> {
    return this.authService.login(loginData);
  }

  @Mutation(() => Boolean)
  async signup(@Args('data') signupData: SignupInput): Promise<boolean> {
    return this.authService.signup(signupData);
  }
}
