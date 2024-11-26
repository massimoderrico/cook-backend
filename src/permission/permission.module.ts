import { Module } from '@nestjs/common';
import { PermissionResolver } from './permission.resolver';
import { PermissionService } from './permission.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [PrismaService, PermissionResolver, PermissionService]
})
export class PermissionModule {}
