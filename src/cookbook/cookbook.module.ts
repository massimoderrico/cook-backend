import { Module } from '@nestjs/common';
import { CookbookResolver } from './cookbook.resolver';
import { CookbookService } from './cookbook.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PrismaService, CookbookResolver, CookbookService]
})
export class CookbookModule {}
