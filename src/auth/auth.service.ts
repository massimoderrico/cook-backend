import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import { PrismaService } from 'src/prisma/prisma.service';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!; // Use service role key only on the backend
export const supabase = createClient(supabaseUrl, supabaseKey);

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(email: string, password: string) {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error) {
      throw new Error(error.message);
    }

    return data.user;
  }

  async login(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      throw new Error(error.message);
    }

    return data.session;
  }

  async getUserFromToken(token: string) {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw new Error(error.message);
    return data.user;
  }

  async validateUserWithToken(token: string) {
    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      throw new UnauthorizedException('Invalid Supabase token');
    }

    // 👇 Upsert user into your local DB
    const localUser = await this.prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: {
        id: user.id, // Use `user.id` as a string
        email: user.email!,
        username: user.email!.split('@')[0],
      },
    });

    return localUser;
  }
}
