# nest-http-proxy

[![NPM version][npm-image]][npm-url]

> A Nest module wrapper for [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware)

## Installation

To begin using it, we first install the required dependencies.

```bash
$ npm install --save nest-http-proxy http-proxy-middleware
```

## Getting started

Once the installation is complete, import the `HttpProxyModule` into the root `AppModule` and run the `forRoot()` static method as shown below:

```typescript
import { Module } from '@nestjs/common';
import { HttpProxyModule } from 'nest-http-proxy';

@Module({
  imports: [
    HttpProxyModule.forRoot({
      '/api': {
        target: 'http://www.example.org/api',
        changeOrigin: true,
      },
    }),
  ],
})
export class AppModule {}
```

The `forRoot()` method accepts a proxy table object to create and configure proxy middlewares.

## Async configuration

When you need to pass module options asynchronously instead of statically, use the `forRootAsync()` method. As with most dynamic modules, Nest provides several techniques to deal with async configuration.

One technique is to use a factory function:

```typescript
HttpProxyModule.forRootAsync({
  useFactory: () => ({
    '/api': {
      target: 'http://www.example.org/api',
      changeOrigin: true,
    },
  }),
});
```

Like other factory providers, our factory function can be [async](https://docs.nestjs.com/fundamentals/custom-providers#factory-providers-usefactory) and can inject dependencies through `inject`.

```typescript
HttpProxyModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => 
    configService.get('proxyTable'),
  inject: [ConfigService],
});
```

Alternatively, you can configure the `HttpProxyModule` using a class instead of a factory, as shown below.

```typescript
HttpProxyModule.forRootAsync({
  useClass: HttpProxyConfigService,
});
```

The construction above instantiates `HttpProxyConfigService` inside `HttpProxyModule`, using it to create an options object. Note that in this example, the `HttpProxyConfigService` has to implement `HttpProxyModuleOptionsFactory` interface as shown below. The `HttpProxyModule` will call the `createHttpProxyOptions()` method on the instantiated object of the supplied class.

```typescript
@Injectable()
class HttpProxyConfigService implements HttpProxyModuleOptionsFactory {
  createHttpProxyOptions(): HttpProxyModuleOptions {
    return {
      '/api': {
        target: 'http://www.example.org/api',
        changeOrigin: true,
      },
    }
  }
}
```

If you want to reuse an existing options provider instead of creating a private copy inside the `HttpProxyModule`, use the `useExisting` syntax.

```typescript
HttpProxyModule.forRootAsync({
  imports: [ConfigModule],
  useExisting: HttpProxyConfigService,
});
```

## License

[MIT](LICENSE)

[npm-image]: https://img.shields.io/npm/v/nest-http-proxy.svg
[npm-url]: https://npmjs.com/package/nest-http-proxy
