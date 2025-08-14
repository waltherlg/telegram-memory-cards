import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RemindIntervalSetDto } from '../../domain/dto/card-lists.dto';
import { CardListRepository } from '../../infrastructure/cards-list.repository';
import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { ActionResultEnum } from '../../../../core/errors/handlers/action-result.handler';

export class SetMinRemindIntervalCommand {
  constructor(public dto: RemindIntervalSetDto) {}
}

@CommandHandler(SetMinRemindIntervalCommand)
export class SetMinRemindIntervalUseCase
  implements ICommandHandler<SetMinRemindIntervalCommand>
{
  constructor(
    private readonly cardListRepo: CardListRepository,
    private readonly usersRepo: UsersRepository,
  ) {}
  async execute(
    command: SetMinRemindIntervalCommand,
  ): Promise<ActionResultEnum> {
    const { userId, hours } = command.dto;
    const isUserExist = await this.usersRepo.isUserExist(userId);
    if (!isUserExist) return ActionResultEnum.UserNotFound;

    const cardList = await this.cardListRepo.getCardList(userId);
    await cardList.setMinInterval(hours);
    return ActionResultEnum.Success;
  }
}
