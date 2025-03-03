import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInResponse } from './dto/signin.input';
import { SignUpInput } from './dto/signin.input';
import { LoginInput } from './dto/login.input';
import { Public } from './public.decorator';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => SignInResponse)
  async login(@Args('data') loginData: LoginInput): Promise<SignInResponse> {
    return this.authService.login(loginData);
  }

  @Public()
  @Mutation(() => SignInResponse)
  async signup(@Args('data') signupData: SignUpInput): Promise<SignInResponse> {
    return this.authService.signup(signupData);
  }
}
