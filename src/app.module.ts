import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver} from '@nestjs/apollo';
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

@Module({
  providers: [PrismaService, AppService, AppResolver],
  exports: [PrismaService],
  imports: [
    GraphQLModule.forRoot({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    PermissionModule,
    CommentModule,
    CommununityModule,
    RecipeModule,
    CookbookModule,
    UserModule
  ],
})
export class AppModule {}
