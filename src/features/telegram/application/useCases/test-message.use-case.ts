import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TelegramAdapter } from '../../../../core/telegram/telegram.adapter';
import { UsersRepository } from '../../../users/infrastructure/users.repository';

export class TelegramTestMessageCommand {
  constructor(public message: string) {}
}

@CommandHandler(TelegramTestMessageCommand)
export class TelegramTestMessageUseCase
  implements ICommandHandler<TelegramTestMessageCommand>
{
  constructor(
    private readonly telegramAdapter: TelegramAdapter,
    private readonly usersRepository: UsersRepository,
  ) {}

  async execute(command: TelegramTestMessageCommand): Promise<any> {
    const users = await this.usersRepository.getAllTelegramUsers();

    for (const user of users) {
      await this.telegramAdapter.sendMessage(user.telegramId, command.message);
    }
  }
}
