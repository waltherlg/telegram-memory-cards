import { Injectable } from '@nestjs/common';
import { InjectBot } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramAdapter {
  constructor(@InjectBot() private readonly bot: Telegraf) {}

  async sendMessage(
    telegramId: string | number,
    message: string,
  ): Promise<void> {
    try {
      await this.bot.telegram.sendMessage(+telegramId, message);
    } catch (error) {
      console.error(
        `❌ Не удалось отправить сообщение Telegram ID ${telegramId}:`,
        error,
      );
    }
  }

  async sendMarkdown(
    telegramId: string | number,
    message: string,
  ): Promise<void> {
    try {
      await this.bot.telegram.sendMessage(+telegramId, message, {
        parse_mode: 'Markdown',
      });
    } catch (error) {
      console.error(
        `❌ Markdown-сообщение не ушло Telegram ID ${telegramId}:`,
        error,
      );
    }
  }
}
