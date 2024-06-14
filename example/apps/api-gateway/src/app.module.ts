import { Module } from '@nestjs/common';
import { HttpProxyModule } from 'nest-http-proxy';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    HttpProxyModule.forRoot({
      '/a': 'http://127.0.0.1:3001/a',
      '/b': 'http://127.0.0.1:3002/b',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
