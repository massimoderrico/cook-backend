import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { SupabaseAuthGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply global Supabase Auth guard
  const reflector = app.get(Reflector);
  app.useGlobalGuards(new SupabaseAuthGuard(reflector));

  await app.listen(4000);
}
bootstrap();
