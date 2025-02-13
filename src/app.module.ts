import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig} from '@nestjs/apollo';
import { AppService } from './app.service';
import { join } from 'path';
import { PrismaService } from './prisma/prisma.service';
import { PermissionModule } from './permission/permission.module';
import { CommentModule } from './comment/comment.module';
import { CommununityModule } from './commununity/commununity.module';
import { RecipeModule } from './recipe/recipe.module';
import { CookbookModule } from './cookbook/cookbook.module';
import { UserModule } from './user/user.module';
import { AppResolver } from './app.resolver';
import { AuthModule } from './auth/auth.module';

@Module({
  providers: [PrismaService, AppService, AppResolver],
  exports: [PrismaService],
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true, 
      introspection: true, 
      path: '/graphql', 
    }),
    PermissionModule,
    CommentModule,
    CommununityModule,
    RecipeModule,
    CookbookModule,
    UserModule,
    AuthModule
  ],
})
export class AppModule {}
