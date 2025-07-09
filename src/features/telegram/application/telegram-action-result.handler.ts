import { Context } from 'telegraf';
import { ActionResultEnum } from '../../../core/errors/handlers/action-result.handler';

export async function telegramHandleActionResult(
  result: ActionResultEnum,
  ctx: Context,
): Promise<boolean> {
  if (!Object.values(ActionResultEnum).includes(result)) {
    return false;
  }
  switch (result) {
    case ActionResultEnum.Success:
      return false;

    case ActionResultEnum.TelegramAlreadyRegistered:
      await ctx.reply('Вы уже зарегистрированы в системе');
      return true;
  }
}
