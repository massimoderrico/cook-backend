import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Example: Check for @Public() metadata
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler());
    if (isPublic) {
      return true;
    }

    // Add your Supabase authentication logic here
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      return false;
    }

    // Validate the token (example logic)
    return this.validateToken(token);
  }

  private validateToken(token: string): boolean {
    // Add your Supabase token validation logic here
    return !!token; // Replace with actual validation
  }
}