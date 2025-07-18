import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { RemainderListRepository } from '../../infrastructure/cards-list.repository';
import { RenewRemainderListCommand } from './renew-card-list.use-case';
import { ActionResultEnum } from '../../../../core/errors/handlers/action-result.handler';
import { CardsRepository } from '../../infrastructure/cards.repository';

export class GetCardFromListCommand {
  constructor(public userId: Types.ObjectId) {}
}

@CommandHandler(GetCardFromListCommand)
export class GetCardFromListUseCase
  implements ICommandHandler<GetCardFromListCommand>
{
  constructor(
    private readonly cardListRepository: RemainderListRepository,
    private readonly cardsRepository: CardsRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(command: GetCardFromListCommand): Promise<any> {
    let list = await this.cardListRepository.getReminderList(command.userId);
    if (!list.cardListToSend) {
      list = await this.commandBus.execute(
        new RenewRemainderListCommand(command.userId),
      );
    }
    if (!list.cardListToSend) {
      return ActionResultEnum.NoCardsInList;
    }

    const cardId = list.cardListToSend[0];
    const card = await this.cardsRepository.getCardById(cardId);
    if (!card) return ActionResultEnum.CardNotFound;

    list.cardListToSend.shift();
    list.markModified('cardListToSend');
    await this.cardListRepository.saveList(list);

    return card;
  }
}
