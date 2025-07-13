import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TelegramConfig } from './config/telegram.config';

@Module({
  imports: [ConfigModule],
  providers: [TelegramConfig],
  exports: [TelegramConfig],
})
export class TelegramConfigModule {}
