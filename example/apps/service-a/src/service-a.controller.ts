import { Controller, Get } from '@nestjs/common';
import { ServiceAService } from './service-a.service';

@Controller('a')
export class ServiceAController {
  constructor(private readonly serviceAService: ServiceAService) {}

  @Get('hello')
  getHello(): string {
    return this.serviceAService.getHello();
  }
}
