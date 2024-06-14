import { ModuleMetadata, Type } from '@nestjs/common';
import { Options } from 'http-proxy-middleware';

export interface HttpProxyModuleOptions {
  [key:string]: string | Options;
}

export interface HttpProxyModuleOptionsFactory {
  createHttpProxyOptions(): Promise<HttpProxyModuleOptions> | HttpProxyModuleOptions;
}

export interface HttpProxyModuleAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  useExisting?: Type<HttpProxyModuleOptionsFactory>;
  useClass?: Type<HttpProxyModuleOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<HttpProxyModuleOptions> | HttpProxyModuleOptions;
  inject?: any[];
}
