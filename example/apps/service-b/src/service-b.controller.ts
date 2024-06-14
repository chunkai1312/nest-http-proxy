import { Controller, Get } from '@nestjs/common';
import { ServiceBService } from './service-b.service';

@Controller('b')
export class ServiceBController {
  constructor(private readonly serviceBService: ServiceBService) {}

  @Get('hello')
  getHello(): string {
    return this.serviceBService.getHello();
  }
}
