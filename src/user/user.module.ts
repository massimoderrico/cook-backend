import { Module } from '@nestjs/common';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';
import { PrismaModule } from '../prisma/prisma.module'; 
import { CookbookResolver } from 'src/cookbook/cookbook.resolver';
import { CookbookService } from 'src/cookbook/cookbook.service';

@Module({
  imports: [PrismaModule],
  providers: [UserResolver, UserService, CookbookResolver, CookbookService]
})
export class UserModule {

  
}
