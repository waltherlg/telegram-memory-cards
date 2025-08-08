import { Context } from 'telegraf';
import { ActionResultEnum } from '../../../core/errors/handlers/action-result.handler';
import { telegramLangSelector } from '../config/i18n/lang-selector.util';
import { TelegramMessages } from '../config/i18n/telegram.messages';

export async function telegramHandleActionResult(
  result,
  ctx: Context,
): Promise<boolean> {
  const leng = telegramLangSelector(ctx.from.language_code);
  if (!Object.values(ActionResultEnum).includes(result)) {
    return true;
  }
  switch (result) {
    case ActionResultEnum.Success:
      return true;

    case ActionResultEnum.NotNotificationTime:
      return true;

    case ActionResultEnum.TelegramAlreadyRegistered:
      await ctx.reply(TelegramMessages[leng].actionResult[result]);
      return false;

    case ActionResultEnum.NoCardsInList:
      await ctx.reply(TelegramMessages[leng].actionResult[result]);
      return false;

    case ActionResultEnum.CardNotFound:
      await ctx.reply(TelegramMessages[leng].actionResult[result]);
      return false;

    case ActionResultEnum.AlreadyRegistered:
      await ctx.reply(TelegramMessages[leng].actionResult[result]);
      return false;

    case ActionResultEnum.UserNotFound:
      await ctx.reply(TelegramMessages[leng].actionResult[result]);
      return false;

    case ActionResultEnum.SomeThingWrong:
      await ctx.reply(TelegramMessages[leng].actionResult[result]);
      return false;

    case ActionResultEnum.NoCardsInCollection:
      await ctx.reply(TelegramMessages[leng].actionResult[result]);
      return false;

    case ActionResultEnum.NotOwner:
      await ctx.reply(TelegramMessages[leng].actionResult[result]);
      return false;

    case ActionResultEnum.CardAlreadyExist:
      await ctx.reply(TelegramMessages[leng].actionResult[result]);
      return false;
  }
}
