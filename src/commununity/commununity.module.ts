import { Module } from '@nestjs/common';
import { CommununityResolver } from './commununity.resolver';
import { CommununityService } from './commununity.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PrismaService, CommununityResolver, CommununityService]
})
export class CommununityModule {}
