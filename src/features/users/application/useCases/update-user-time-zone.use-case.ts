import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { UsersRepository } from '../../infrastructure/users.repository';
import { ActionResultEnum } from '../../../../core/errors/handlers/action-result.handler';

export class UpdateUserTimeZoneCommand {
  constructor(
    public userId: Types.ObjectId,
    public timeZone: number,
  ) {}
}

@CommandHandler(UpdateUserTimeZoneCommand)
export class UpdateUserTimeZoneUseCase
  implements ICommandHandler<UpdateUserTimeZoneCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute(command: UpdateUserTimeZoneCommand): Promise<ActionResultEnum> {
    const user = await this.usersRepository.getUserById(command.userId);
    if (!user) return ActionResultEnum.UserNotFound;
    user.timeZone = command.timeZone;
    if (await this.usersRepository.save(user)) {
      return ActionResultEnum.Success;
    } else {
      return ActionResultEnum.SomeThingWrong;
    }
  }
}
