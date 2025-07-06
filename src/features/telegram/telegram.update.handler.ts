import { Injectable, OnModuleInit } from '@nestjs/common';
import { TelegramService } from './telegram.service';

@Injectable()
export class TelegramUpdateHandler implements OnModuleInit {
  constructor(private readonly telegramService: TelegramService) {}

  onModuleInit() {
    const bot = this.telegramService.getBot();

    bot.start((ctx) => {
      ctx.reply('Привет! Я бот 🤖');
    });

    bot.command('ping', (ctx) => {
      ctx.reply('pong!');
    });

    bot.on('text', (ctx) => {
      const from = ctx.from;
      console.log(from);
      ctx.reply(`Ты написал: ${ctx.message.text}, от ${from}`);
    });
  }
}
