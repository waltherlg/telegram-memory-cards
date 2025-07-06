import { Module } from '@nestjs/common';
import { TelegramConfig } from './config/telegram.config';
import { TelegramUpdateHandler } from './telegram.update.handler';
import { TelegramService } from './telegram.service';

@Module({
  providers: [TelegramService, TelegramUpdateHandler, TelegramConfig],
})
export class TelegramModule {}
