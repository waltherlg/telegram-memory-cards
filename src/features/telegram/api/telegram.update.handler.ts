import { Injectable, OnModuleInit, UseGuards } from '@nestjs/common';
import { CreateUserTelegramDto } from '../domain/dto/user.telegram.domain.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UserRegisterViaTelegramCommand } from '../application/useCases/user-register-via-telegram.use-case';
import { telegramHandleActionResult } from '../application/telegram-action-result.handler';
import { Command, Ctx, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { TelegramAuthGuard } from '../guards/telegram-auth.guard';
import { CreateCardDto } from '../../cards/domain/dto/cards.dto';
import { newCardParser } from '../utils/newCardParser';
import { UserCreateCardCommand } from '../../cards/application/use.cases/create-card.use-case';
import { CardsRepository } from '../../cards/infrastructure/cards.repository';

@Update()
export class TelegramUpdateHandler implements OnModuleInit {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly cardsRepository: CardsRepository,
  ) {}

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

    const isHandled = await telegramHandleActionResult(result, ctx);
    if (!isHandled) return;

    await ctx.reply(
      `Поздравляю, ты зарегистрировался как ${username} c айдишкой ${result}`,
    );
  }

  @Command('read')
  @UseGuards(TelegramAuthGuard)
  async getRandomCard(@Ctx() ctx: Context) {
    const card = await this.cardsRepository.getRandomCardByUser(
      ctx.state.userId,
    );
    if (!card) {
      await ctx.reply('К сожалению карточка не найдена');
      return;
    }

    await ctx.reply(`${card.text}`);
  }

  @Command('new')
  @UseGuards(TelegramAuthGuard)
  async onMakeCard(@Ctx() ctx: Context) {
    if (!('text' in ctx.message)) {
      await ctx.reply(
        '⚠️ Это не текстовое сообщение. Пожалуйста, введите команду текстом.',
      );
      return;
    }
    const massage = ctx.message?.text || null;
    const parsed = newCardParser(massage);

    if (!parsed) {
      await ctx.reply(
        '⚠️ Неверный формат.\nПравильно так:\n/new # категория # заголовок # текст',
      );
      return;
    }

    const dto: CreateCardDto = {
      userId: ctx.state.userId,
      category: parsed.category,
      title: parsed.title,
      text: parsed.text,
    };

    try {
      const cardTitle = await this.commandBus.execute(
        new UserCreateCardCommand(dto),
      );

      await ctx.reply(`✅ Карточка "${cardTitle}" успешно создана!`);
    } catch (error) {
      console.error('Ошибка при создании карточки:', error);
      await ctx.reply('❌ Не удалось создать карточку. Попробуйте позже.');
    }
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
