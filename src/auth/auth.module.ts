import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { PrismaModule } from '../prisma/prisma.module';
import { UserService } from 'src/user/user.service';
import { CookbookService } from 'src/cookbook/cookbook.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET, 
    }),
    PrismaModule,
  ],
  providers: [AuthService, AuthResolver, UserService, CookbookService],
  exports: [AuthService],
})
export class AuthModule {}
