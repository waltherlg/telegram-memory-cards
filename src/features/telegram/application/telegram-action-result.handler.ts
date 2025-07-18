import { Context } from 'telegraf';
import { ActionResultEnum } from '../../../core/errors/handlers/action-result.handler';

export async function telegramHandleActionResult(
  result,
  ctx: Context,
): Promise<boolean> {
  if (!Object.values(ActionResultEnum).includes(result)) {
    return true;
  }
  switch (result) {
    case ActionResultEnum.Success:
      return true;

    case ActionResultEnum.TelegramAlreadyRegistered:
      await ctx.reply('Вы уже зарегистрированы в системе');
      return false;

    case ActionResultEnum.NoCardsInList:
      await ctx.reply(
        'К сожалению у вас нет карточек в списке, возможно стоит их обновить?',
      );
      return false;

    case ActionResultEnum.CardNotFound:
      await ctx.reply('Странно, но я не нашел нужную карточку');
      return false;

    case ActionResultEnum.AlreadyRegistered:
      await ctx.reply('Вы уже зарагистрированы в системе');
      return false;
  }
}
