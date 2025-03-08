import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async signup(signupInput: { email: string; username: string; password: string }) {
    const { email, username, password } = signupInput;
    
    // Check if user with username already exists
    const existingUsername = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUsername) throw new ConflictException('Username unavailable');
  
    // Check if user with email already exists
    const existingEmail = await this.prisma.user.findUnique({
      where: { email },
    });
    if (existingEmail) throw new ConflictException('User already exists with that email');

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create the user
    const user = await this.userService.createUser({
      email,
      username,
      password: hashedPassword,
    });
  
    // Generate JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);
  
    return { accessToken, userId: user.id, email: user.email, username: user.username };
  }
  

  async login(loginInput: { email: string; password: string }) {
    const { email, password } = loginInput;

    // Find the user by email
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

    // Generate JWT
    const payload = { sub: user.id, email: user.email, role: user.role };
    const accessToken = this.jwtService.sign(payload);

    return { accessToken, userId: user.id, email: user.email, username: user.username };
  }
}
