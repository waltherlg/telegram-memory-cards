import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { CardListRepository } from '../../infrastructure/cards-list.repository';
import { RenewCardListCommand } from './renew-card-list.use-case';
import { ActionResultEnum } from '../../../../core/errors/handlers/action-result.handler';
import { CardsRepository } from '../../infrastructure/cards.repository';
import { CardDocument } from '../../infrastructure/schemas/card.schema';
import { CARD_CONSTANTS } from '../../config/card.constants/card.constants';

export class GetCardFromListCommand {
  constructor(
    public userId: Types.ObjectId,
    public readonly checkTime: boolean = false,
  ) {}
}

@CommandHandler(GetCardFromListCommand)
export class GetCardFromListUseCase
  implements ICommandHandler<GetCardFromListCommand>
{
  constructor(
    private readonly cardListRepository: CardListRepository,
    private readonly cardsRepository: CardsRepository,
    private readonly commandBus: CommandBus,
  ) {}

  async execute(
    command: GetCardFromListCommand,
  ): Promise<CardDocument | ActionResultEnum> {
    let list = await this.cardListRepository.getCardList(command.userId);

    if (list.cardListToSend.length === 0) {
      list = await this.commandBus.execute(
        new RenewCardListCommand(command.userId),
      );

      if (list.cardListToSend.length === 0) {
        return ActionResultEnum.NoCardsInCollection;
      }
    }

    if (command.checkTime) {
      const now = new Date();
      const lastSentAt = list.lastSentAt ?? list.createdAt;
      if (
        now.getTime() - new Date(lastSentAt).getTime() <
          list.minRemaindInterval ||
        CARD_CONSTANTS.MIN_REMAIND_INTERVAL
      ) {
        return ActionResultEnum.NotNotificationTime;
      }
    }

    const cardId = list.cardListToSend[0];
    const card = await this.cardsRepository.getCardById(cardId);
    if (!card) return ActionResultEnum.CardNotFound;

    list.cardListToSend.shift();
    list.lastSentAt = new Date();
    list.markModified('cardListToSend');
    await this.cardListRepository.saveList(list);

    return card;
  }
}
