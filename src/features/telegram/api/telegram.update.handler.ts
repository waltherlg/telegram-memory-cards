import { Injectable, OnModuleInit } from '@nestjs/common';
import { TelegramService } from '../telegram.service';
import { CreateUserTelegramDto } from '../domain/dto/user.telegram.domain.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UserRegisterViaTelegramCommand } from '../application/useCases/user-register-via-telegram.use-case';

@Injectable()
export class TelegramUpdateHandler implements OnModuleInit {
  constructor(
    private readonly telegramService: TelegramService,
    private readonly commandBus: CommandBus,
  ) {}

  onModuleInit() {
    const bot = this.telegramService.getBot();

    bot.start((ctx) => {
      ctx.reply('Привет! Я бот 🤖');
    });

    bot.command('ping', (ctx) => {
      ctx.reply('pong!');
    });

    bot.command('register', async (ctx) => {
      const { id, username } = ctx.from;

      const dto: CreateUserTelegramDto = {
        telegramId: id.toString(),
        userName: username,
      };

      const result = await this.commandBus.execute(
        new UserRegisterViaTelegramCommand(dto),
      );

      if (typeof result === 'string') {
        ctx.reply(
          `Поздравляю, зарегистрировался как ${username} c айдишкой ${result}`,
        );
      } else {
        ctx.reply(
          `${username}, либо ты уже зарегистрировался, либо что то пошло не так`,
        );
      }
    });

    bot.on('text', (ctx) => {
      const from = ctx.from;
      console.log(from);
      ctx.reply(`Ты написал: ${ctx.message.text}, от ${from.username}`);
    });
  }
}
