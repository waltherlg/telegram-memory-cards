import { Injectable, OnModuleInit } from '@nestjs/common';
import { Context, Telegraf } from 'telegraf';
import { TelegramConfig } from './config/telegram.config';

@Injectable()
export class TelegramService implements OnModuleInit {
  private readonly bot: Telegraf;

  constructor(telegramConfig: TelegramConfig) {
    this.bot = new Telegraf(telegramConfig.telegramBotToken);
  }

  onModuleInit() {
    this.bot.launch();
    console.log('Telegram bot launched');
  }

  getBot(): Telegraf<Context> {
    return this.bot;
  }
}
