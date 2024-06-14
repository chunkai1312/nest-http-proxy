import { Module } from '@nestjs/common';
import { ServiceAController } from './service-a.controller';
import { ServiceAService } from './service-a.service';

@Module({
  imports: [],
  controllers: [ServiceAController],
  providers: [ServiceAService],
})
export class ServiceAModule {}
