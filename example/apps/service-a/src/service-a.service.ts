import { Injectable } from '@nestjs/common';

@Injectable()
export class ServiceAService {
  getHello(): string {
    return 'Hello World! service-a';
  }
}
