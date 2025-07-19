import {
  OnApplicationBootstrap,
  OnModuleInit,
  UseGuards,
} from '@nestjs/common';
import { CreateUserTelegramDto } from '../domain/dto/user.telegram.domain.dto';
import { CommandBus } from '@nestjs/cqrs';
import { UserRegisterViaTelegramCommand } from '../application/useCases/user-register-via-telegram.use-case';
import { telegramHandleActionResult } from '../application/telegram-action-result.handler';
import { Command, Ctx, InjectBot, On, Start, Update } from 'nestjs-telegraf';
import { Context } from 'telegraf';
import { TelegramAuthGuard } from '../guards/telegram-auth.guard';
import { CreateCardDto } from '../../cards/domain/dto/cards.dto';
import { newCardParser } from '../utils/newCardParser';
import { UserCreateCardCommand } from '../../cards/application/use.cases/create-card.use-case';
import { RenewRemainderListCommand } from '../../cards/application/use.cases/renew-card-list.use-case';
import { GetCardFromListCommand } from '../../cards/application/use.cases/get-card-from-list.use-case';
import { UpdateUserTimeZoneCommand } from '../../users/application/useCases/update-user-time-zone.use-case';
import { SendCardToAllUsersCommand } from '../application/useCases/send-random-card-to-all-users.use-case';

@Update()
export class TelegramUpdateHandler implements OnApplicationBootstrap {
  constructor(private readonly commandBus: CommandBus) {}

  async onApplicationBootstrap() {
    console.log('✅ Telegram bot is ready (app fully bootstrapped)');
    await this.commandBus.execute(new SendCardToAllUsersCommand(true));
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    await ctx.reply(
      `👋 Привет! Я бот приложения карточек-напоминалок.

📝 Ты можешь создавать карточки, и я буду время от времени показывать их тебе — либо автоматически, либо по твоему запросу.

⚙️ Но сначала тебе нужно зарегистрироваться — просто введи команду /register, чтобы я знал, какие карточки относятся именно к тебе.

ℹ️ Полный список доступных команд ты можешь получить с помощью /help.

⚠️ Важная особенность: приложение работает на бесплатном тарифе и засыпает через 15 минут бездействия (и я вместе с ним 💤).

🤔 Как проверить, сплю ли я? Просто напиши любое сообщение. Если я не отвечаю — значит, я сплю.

🔗 Я просыпаюсь каждый час, но чтобы разбудить меня самостоятельно, перейди по этой ссылке: ${'https://telegram-memory-cards.onrender.com'}
Я проснусь через несколько секунд! 😊.

🕰️ После того как ты укажешь свой часовой пояс,
я буду отправлять тебе напоминалки ПРИМЕРНО каждые 2 часа — с 8 утра до 9 вечера. 😊`,
    );
  }

  @Command('help')
  async onHelp(@Ctx() ctx: Context) {
    await ctx.reply(
      `📋 *Доступные команды:*

📝 /register — зарегистрирует тебя в системе.

🌍 /settimezone — установить часовой пояс.  
Без этого я не буду слать тебе карточки сам, чтобы не разбудить тебя ночью.  
Например, "/settimezone +3" установит часовой пояс МСК.

🆕 /new — создаст новую карточку.  
Формат: \`/new # категория # заголовок карточки # текст карточки\`

📖 /read — выдаст тебе случайную карточку из твоей колоды.

🔀 /mixcards — перетасует карточки, если хочешь всё начать заново.
  `,
      {
        parse_mode: 'Markdown',
      },
    );
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
      userName: username ? username : id.toString(),
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

  @UseGuards(TelegramAuthGuard)
  @Command('settimezone')
  async setTimeZone(@Ctx() ctx: Context) {
    if (!('text' in ctx.message)) {
      await ctx.reply(
        '⚠️ Это не текстовое сообщение. Пожалуйста, введи команду в виде текста.',
      );
      return;
    }

    const messageText = ctx.message.text.trim();
    const parts = messageText.split(/\s+/);

    if (parts.length < 2) {
      await ctx.reply('ℹ️ Укажи часовой пояс, например: /settimezone 6');
      return;
    }

    const timeZoneStr = parts[1];
    const timeZone = Number(timeZoneStr);

    if (!Number.isInteger(timeZone) || timeZone < -12 || timeZone > 14) {
      await ctx.reply(
        `🤔 То есть ты живёшь в часовом поясе ${timeZoneStr}? Очень смешно.`,
      );
      return;
    }

    const userId = ctx.state.user._id;
    const result = await this.commandBus.execute(
      new UpdateUserTimeZoneCommand(userId, timeZone),
    );
    const isHandled = await telegramHandleActionResult(result, ctx);
    if (!isHandled) return;

    await ctx.reply(`✅ Часовой пояс успешно установлен на ${timeZone}`);
  }

  @Command('read')
  @UseGuards(TelegramAuthGuard)
  async getRandomCard(@Ctx() ctx: Context) {
    const result = await this.commandBus.execute(
      new GetCardFromListCommand(ctx.state.userId),
    );

    const isHandled = await telegramHandleActionResult(result, ctx);
    if (!isHandled) return;

    await ctx.reply(`${result.text}`);
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

  @UseGuards(TelegramAuthGuard)
  @Command('mixcards')
  async mixCardList(@Ctx() ctx: Context) {
    await this.commandBus.execute(
      new RenewRemainderListCommand(ctx.state.userId),
    );
    await ctx.reply('Ваши карточки перемешаны вновь');
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
