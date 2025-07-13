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
  }
}
