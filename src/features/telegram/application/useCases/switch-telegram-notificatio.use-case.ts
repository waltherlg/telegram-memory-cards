import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SwithNotificationInputDto } from '../../api/dto/switchNotificationDto';
import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { UserDocument } from '../../../users/infrastructure/schemas/user.schema';
import { ActionResultEnum } from '../../../../core/errors/handlers/action-result.handler';

export class SwitchTelegramNotificationCommand {
  constructor(public dto: SwithNotificationInputDto) {}
}

@CommandHandler(SwitchTelegramNotificationCommand)
export class SwitchTelegramNotificationUseCase
  implements ICommandHandler<SwitchTelegramNotificationCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute(
    command: SwitchTelegramNotificationCommand,
  ): Promise<ActionResultEnum> {
    const user: UserDocument = await this.usersRepository.getUserById(
      command.dto.userId,
    );

    if (!user) return ActionResultEnum.UserNotFound;

    user.notificationOn = command.dto.notificationOn;
    user.save();
  }
}
