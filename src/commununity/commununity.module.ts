import { Module } from '@nestjs/common';
import { CommununityResolver } from './commununity.resolver';
import { CommununityService } from './commununity.service';

@Module({
  providers: [CommununityResolver, CommununityService]
})
export class CommununityModule {}
