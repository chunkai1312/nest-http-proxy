import { DynamicModule, Global, Inject, MiddlewareConsumer, Module, NestModule, Provider } from '@nestjs/common';
import { HttpProxyModuleOptions, HttpProxyModuleAsyncOptions, HttpProxyModuleOptionsFactory } from './interfaces/http-proxy-module.options.interface';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { HTTP_PROXY_OPTIONS } from './http-proxy.constants';

@Global()
@Module({})
export class HttpProxyModule implements NestModule {
  static forRoot(options: HttpProxyModuleOptions): DynamicModule {
    const providers = [
      {
        provide: HTTP_PROXY_OPTIONS,
        useValue: options,
      },
    ];
    return {
      module: HttpProxyModule,
      providers,
      exports: providers,
    };
  }

  static forRootAsync(options: HttpProxyModuleAsyncOptions): DynamicModule {
    const providers = [
      ...this.createAsyncProviders(options),
    ];
    return {
      module: HttpProxyModule,
      imports: options.imports || [],
      providers,
      exports: providers,
    };
  }

  private static createAsyncProviders(
    options: HttpProxyModuleAsyncOptions,
  ): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }
    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: options.useClass,
        useClass: options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: HttpProxyModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: HTTP_PROXY_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: HTTP_PROXY_OPTIONS,
      useFactory: async (optionsFactory: HttpProxyModuleOptionsFactory) =>
        await optionsFactory.createHttpProxyOptions(),
      inject: [options.useExisting || options.useClass],
    };
  }

  constructor(@Inject(HTTP_PROXY_OPTIONS) private readonly options: HttpProxyModuleOptions) {}

  configure(consumer: MiddlewareConsumer) {
    const proxyTable = this.options;

    Object.keys(proxyTable).forEach((context) => {
      let options = proxyTable[context];
      if (typeof options === 'string') {
        options = { target: options, changeOrigin: true };
      }
      const httpProxy = createProxyMiddleware(options);
      consumer
        .apply(httpProxy)
        .forRoutes(context);
    });
  }
}
