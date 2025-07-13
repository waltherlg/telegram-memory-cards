import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { UsersRepository } from '../../users/infrastructure/users.repository';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  constructor(private readonly usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const telegrafCtx = TelegrafExecutionContext.create(context);
    const ctx = telegrafCtx.getContext();

    const telegramId = ctx.from?.id?.toString();
    if (!telegramId) return false;

    const userId =
      await this.usersRepository.exchangeTelegramIdToUserId(telegramId);
    if (!userId) {
      await ctx.reply('Вы не зарегистрированы. Введите /register');
      return false;
    }

    ctx.state.userId = userId;
    return true;
  }
}
