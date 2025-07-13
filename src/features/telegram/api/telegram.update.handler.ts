import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserTelegramDto } from '../domain/dto/user.telegram.domain.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UserRegisterViaTelegramCommand } from '../application/useCases/user-register-via-telegram.use-case';
import { telegramHandleActionResult } from '../application/telegram-action-result.handler';
import { Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';

@Update()
export class TelegramUpdateHandler implements OnModuleInit {
  constructor(private readonly commandBus: CommandBus) {}

  onModuleInit() {
    console.log('✅ Telegram bot is ready (handler initialized)');
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply('Привет! Я бот 🤖');
  }

  @Command('register')
  async onRegister(@Ctx() ctx: Context) {
    const { id, username, is_bot } = ctx.from!;

    if (is_bot) {
      await ctx.reply(`Сорян, ботам вход запрещен`);
      return;
    }

    const dto: CreateUserTelegramDto = {
      telegramId: id.toString(),
      userName: username || id.toString(),
    };

    const result = await this.commandBus.execute(
      new UserRegisterViaTelegramCommand(dto),
    );

    const isHandled = telegramHandleActionResult(result, ctx);
    if (isHandled) return;

    await ctx.reply(
      `Поздравляю, ты зарегистрировался как ${username} c айдишкой ${result}`,
    );
  }

  @Command('сделай')
  async onMakeCard(@Ctx() ctx: Context) {
    await ctx.reply('🛠 Команда "сделай карточку" будет реализована позже');
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    const from = ctx.from!;
    const message = ctx.message;

    if ('text' in message) {
      await ctx.reply(`Ты написал: ${message.text}, от ${from.username}`);
    } else {
      await ctx.reply(`Ты отправил что-то странное 🤔`);
    }
  }
}
