import { Module } from '@nestjs/common';
import { TelegramConfig } from './config/telegram.config';
import { TelegramUpdateHandler } from './api/telegram.update.handler';
import { TelegramUseCases } from './application/useCases/telegram.use-cases.provider';
import { UserModule } from '../users/user.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramConfigModule } from './telegram-config.module';
import { CardModule } from '../cards/cards.module';
import { TelegramAdapter } from '../../core/telegram/telegram.adapter';

@Module({
  imports: [
    UserModule,
    CardModule,
    TelegramConfigModule,
    TelegrafModule.forRootAsync({
      imports: [TelegramConfigModule],
      inject: [TelegramConfig],
      useFactory: (telegramConfig: TelegramConfig) => ({
        token: telegramConfig.telegramBotToken,
      }),
    }),
  ],
  providers: [
    TelegramAdapter,
    TelegramUpdateHandler,
    TelegramConfig,
    ...TelegramUseCases,
  ],
  exports: [TelegramConfig, TelegramAdapter],
})
export class TelegramModule {}
