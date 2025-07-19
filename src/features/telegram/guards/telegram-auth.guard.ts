import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TelegrafExecutionContext } from 'nestjs-telegraf';
import { UsersRepository } from '../../users/infrastructure/users.repository';
import { UserDocument } from '../../users/infrastructure/schemas/user.schema';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  constructor(private readonly usersRepository: UsersRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const telegrafCtx = TelegrafExecutionContext.create(context);
    const ctx = telegrafCtx.getContext();

    const telegramId = ctx.from?.id?.toString();
    if (!telegramId) return false;

    const user: UserDocument =
      await this.usersRepository.getUserByTelegramId(telegramId);
    if (!user) {
      await ctx.reply('Вы не зарегистрированы. Введите /register');
      return false;
    }

    ctx.state.userId = user._id;
    return true;
  }
}
