//global module

import { Global, Module } from '@nestjs/common';
import { CoreConfig } from './config/core.config';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthModule } from '../auth/auth.module';

@Global()
@Module({
  imports: [CqrsModule.forRoot(), AuthModule],
  providers: [CoreConfig],
  exports: [CqrsModule, CoreConfig, AuthModule],
})
export class CoreModule {}
