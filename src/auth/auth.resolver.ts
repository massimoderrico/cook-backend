import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SignInResponse, SignUpInput } from './dto/signin';
import { Public } from './public.decorator';
import { LoginInput } from './dto/login';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Mutation(() => SignInResponse)
  async login(@Args('data') loginData: LoginInput): Promise<SignInResponse> {
    const { email, password } = loginData;
    const session = await this.authService.login(email, password);
    return {
      accessToken: session.access_token,
      refreshToken: session.refresh_token,
    };
  }

  @Public()
  @Mutation(() => SignInResponse)
  async signup(@Args('data') signupData: SignUpInput): Promise<SignInResponse> {
    const { email, password } = signupData;
    const user = await this.authService.signup(email, password);
    return {
      accessToken: null, // Supabase doesn't return an access token on signup
      refreshToken: null, // Supabase doesn't return a refresh token on signup
      userId: user.id,
      email: user.email,
    };
  }
}