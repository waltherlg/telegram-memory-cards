import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TelegramAdapter } from '../../../../core/telegram/telegram.adapter';
import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { GetCardFromListCommand } from '../../../cards/application/use.cases/get-card-from-list.use-case';
import { ActionResultEnum } from '../../../../core/errors/handlers/action-result.handler';
import { CardDocument } from '../../../cards/infrastructure/schemas/card.schema';
import { isNotificationAllowed } from '../../utils/notification-time-allowed';
import { USER_CONSTANTS } from '../../../users/user.config/users.constants/user.constants';

export class SendCardToAllUsersCommand {
  constructor(public checkTime?: boolean) {}
}

@CommandHandler(SendCardToAllUsersCommand)
export class SendCardToAllUsersUseCase
  implements ICommandHandler<SendCardToAllUsersCommand>
{
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly telegramAdapter: TelegramAdapter,
    private readonly commandBus: CommandBus,
  ) {}
  async execute(command: SendCardToAllUsersCommand): Promise<any> {
    const users = await this.usersRepository.getAllTelegramUsersWithTimeZone();

    for (const user of users) {
      if (!user.timeZone) continue;

      const isAllowed = isNotificationAllowed(
        user.timeZone,
        USER_CONSTANTS.SLEEP_TIME.START,
        USER_CONSTANTS.SLEEP_TIME.STOP,
      );
      if (!isAllowed) continue;

      const result: CardDocument | ActionResultEnum =
        await this.commandBus.execute(
          new GetCardFromListCommand(
            user._id,
            command.checkTime ? command.checkTime : false,
          ),
        );

      if (typeof result !== 'string') {
        await this.telegramAdapter.sendMessage(
          user.telegramId,
          `📌 ${result.text}`,
        );
      }
    }
  }
}
