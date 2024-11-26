import { Module } from '@nestjs/common';
import { RecipeResolver } from './recipe.resolver';
import { RecipeService } from './recipe.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [RecipeResolver, RecipeService]
})
export class RecipeModule {}
