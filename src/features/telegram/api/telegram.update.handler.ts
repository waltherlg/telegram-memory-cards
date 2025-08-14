import { OnApplicationBootstrap, UseGuards } from '@nestjs/common';
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
import { RenewCardListCommand } from '../../cards/application/use.cases/renew-card-list.use-case';
import { GetCardFromListCommand } from '../../cards/application/use.cases/get-card-from-list.use-case';
import { UpdateUserTimeZoneCommand } from '../../users/application/useCases/update-user-time-zone.use-case';
import { SendCardToAllUsersCommand } from '../application/useCases/send-random-card-to-all-users.use-case';
import { TelegramUserDeleteCardCommand } from '../../cards/application/use.cases/tg-user-delete-card.use-case';
import { TelegramMessages } from '../config/i18n/telegram.messages';
import { telegramLangSelector } from '../config/i18n/lang-selector.util';
import { SwithNotificationInputDto } from './dto/switchNotificationDto';
import { SwitchTelegramNotificationCommand } from '../application/useCases/switch-telegram-notificatio.use-case';
import { ActionResultEnum } from '../../../core/errors/handlers/action-result.handler';
import { SaCardViewDto } from '../../cards/api/dto/card.view.dto';
import { RemindIntervalSetDto } from '../../cards/domain/dto/card-lists.dto';
import { SetMinRemindIntervalCommand } from '../../cards/application/use.cases/set-remind-interval.use-case';

@Update()
export class TelegramUpdateHandler implements OnApplicationBootstrap {
  constructor(private readonly commandBus: CommandBus) {}

  async onApplicationBootstrap() {
    console.log('✅ Telegram bot is ready (app fully bootstrapped)');
    await this.commandBus.execute(new SendCardToAllUsersCommand(true));
  }

  @Start()
  async onStart(@Ctx() ctx: Context) {
    const lang = telegramLangSelector(ctx.from.language_code);
    await ctx.reply(TelegramMessages[lang].start);
  }

  @Command('help')
  async onHelp(@Ctx() ctx: Context) {
    console.log(ctx.from);

    const lang = telegramLangSelector(ctx.from.language_code);
    await ctx.reply(TelegramMessages[lang].help, {
      parse_mode: 'Markdown',
    });
  }

  @Command('register')
  async onRegister(@Ctx() ctx: Context) {
    const { id, username, is_bot } = ctx.from!;
    const lang = telegramLangSelector(ctx.from.language_code);

    if (is_bot) {
      await ctx.reply(TelegramMessages[lang].register.noBot);
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
      TelegramMessages[lang].register.registered(username, result),
    );
  }

  @UseGuards(TelegramAuthGuard)
  @Command('settimezone')
  async setTimeZone(@Ctx() ctx: Context) {
    const lang = telegramLangSelector(ctx.from.language_code);
    const msg = TelegramMessages[lang].setTimezone;
    if (!('text' in ctx.message)) {
      await ctx.reply(msg.notText);
      return;
    }

    const messageText = ctx.message.text.trim();
    const parts = messageText.split(/\s+/);

    if (parts.length < 2) {
      await ctx.reply(msg.missingArg);
      return;
    }

    const timeZoneStr = parts[1];
    const timeZone = Number(timeZoneStr);

    if (!Number.isInteger(timeZone) || timeZone < -12 || timeZone > 14) {
      await ctx.reply(msg.invalid(timeZoneStr));
      return;
    }

    const userId = ctx.state.userId;
    const result = await this.commandBus.execute(
      new UpdateUserTimeZoneCommand(userId, timeZone),
    );
    const isHandled = await telegramHandleActionResult(result, ctx);
    if (!isHandled) return;

    await ctx.reply(msg.success(timeZone));
  }

  @Command('read')
  @UseGuards(TelegramAuthGuard)
  async getRandomCard(@Ctx() ctx: Context) {
    const result = await this.commandBus.execute(
      new GetCardFromListCommand(ctx.state.userId),
    );

    const isHandled = await telegramHandleActionResult(result, ctx);
    if (!isHandled) return;

    await ctx.reply(`${result.title}`);
    await ctx.reply(`📌 ${result.text}`);
  }

  @Command('new')
  @UseGuards(TelegramAuthGuard)
  async onMakeCard(@Ctx() ctx: Context) {
    const lang = telegramLangSelector(ctx.from.language_code);
    if (!('text' in ctx.message)) {
      await ctx.reply(TelegramMessages[lang].notText);
      return;
    }
    const massage = ctx.message?.text || null;
    const parsed = newCardParser(massage);

    if (!parsed) {
      await ctx.reply(TelegramMessages[lang].new.wrongFormat);
      return;
    }

    const dto: CreateCardDto = {
      userId: ctx.state.userId,
      category: parsed.category,
      title: parsed.title,
      text: parsed.text,
    };

    try {
      const result = await this.commandBus.execute(
        new UserCreateCardCommand(dto),
      );

      const isHandled = await telegramHandleActionResult(result, ctx);
      if (!isHandled) return;

      await ctx.reply(TelegramMessages[lang].new.cardCreated(result.title));
    } catch (error) {
      await ctx.reply(TelegramMessages[lang].new.notCreated);
    }
  }

  @UseGuards(TelegramAuthGuard)
  @Command('mixcards')
  async mixCardList(@Ctx() ctx: Context) {
    const lang = telegramLangSelector(ctx.from.language_code);
    await this.commandBus.execute(new RenewCardListCommand(ctx.state.userId));
    await ctx.reply(TelegramMessages[lang].mixcard.mixed);
  }

  @UseGuards(TelegramAuthGuard)
  @Command('setinterval')
  async setReminderInterval(@Ctx() ctx: Context) {
    const lang = telegramLangSelector(ctx.from.language_code);
    if (!('text' in ctx.message)) {
      await ctx.reply(TelegramMessages[lang].notText);
      return;
    }

    const text = ctx.message.text.trim();
    const hours = text.replace(/^\/setinterval\s*/i, '').trim();
    if (+hours < 0 || +hours > 23) {
      await ctx.reply(TelegramMessages[lang].setinterval.wrongFormat);
      return;
    }

    const dto: RemindIntervalSetDto = {
      userId: ctx.state.userId,
      hours: +hours,
    };

    const result = await this.commandBus.execute(
      new SetMinRemindIntervalCommand(dto),
    );
    const isHandled = await telegramHandleActionResult(result, ctx);
    if (!isHandled) return;
    await ctx.reply(TelegramMessages[lang].setinterval.succsess(hours));
  }

  @UseGuards(TelegramAuthGuard)
  @Command('delete')
  async deleteCard(@Ctx() ctx: Context) {
    const lang = telegramLangSelector(ctx.from.language_code);
    if (!('text' in ctx.message)) {
      await ctx.reply(TelegramMessages[lang].notText);
      return;
    }

    const text = ctx.message.text.trim();
    const cardTitle = text.replace(/^\/delete\s*/i, '').trim();

    if (!cardTitle) {
      await ctx.reply(TelegramMessages[lang].delete.writeCardTitle);
      return;
    }

    const result = await this.commandBus.execute(
      new TelegramUserDeleteCardCommand(ctx.state.userId, cardTitle),
    );

    const isHandled = await telegramHandleActionResult(result, ctx);
    if (!isHandled) return;

    await ctx.reply(TelegramMessages[lang].delete.deleted);
  }

  @UseGuards(TelegramAuthGuard)
  @Command('turnon')
  async tutnOnNotification(@Ctx() ctx: Context) {
    const lang = telegramLangSelector(ctx.from.language_code);
    const dto: SwithNotificationInputDto = {
      userId: ctx.state.userId,
      notificationOn: true,
    };

    const result = await this.commandBus.execute(
      new SwitchTelegramNotificationCommand(dto),
    );
    const isHandled = await telegramHandleActionResult(result, ctx);
    if (!isHandled) return;

    await ctx.reply(TelegramMessages[lang].turnOn);
  }

  @UseGuards(TelegramAuthGuard)
  @Command('turnoff')
  async tutnOffNotification(@Ctx() ctx: Context) {
    const lang = telegramLangSelector(ctx.from.language_code);
    const dto: SwithNotificationInputDto = {
      userId: ctx.state.userId,
      notificationOn: false,
    };

    const result = await this.commandBus.execute(
      new SwitchTelegramNotificationCommand(dto),
    );
    const isHandled = await telegramHandleActionResult(result, ctx);
    if (!isHandled) return;

    await ctx.reply(TelegramMessages[lang].turnOff);
  }

  @On('text')
  async onText(@Ctx() ctx: Context) {
    const lang = telegramLangSelector(ctx.from.language_code);
    const message = ctx.message;

    if ('text' in message) {
      await ctx.reply(TelegramMessages[lang].text.return(message.text));
    } else {
      await ctx.reply(TelegramMessages[lang].text.noText);
    }
  }
}
