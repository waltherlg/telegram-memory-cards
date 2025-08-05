import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { CardsRepository } from '../../infrastructure/cards.repository';
import { CardListDocument } from '../../infrastructure/schemas/cards-list.shema';
import { CardListRepository } from '../../infrastructure/cards-list.repository';

export class RenewCardListCommand {
  constructor(public userId: Types.ObjectId) {}
}

@CommandHandler(RenewCardListCommand)
export class RenewCardListUseCase
  implements ICommandHandler<RenewCardListCommand>
{
  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly cardListRepository: CardListRepository,
  ) {}

  async execute(command: RenewCardListCommand): Promise<CardListDocument> {
    const cardList = await this.cardListRepository.getCardList(command.userId);

    cardList.cardListToSend =
      await this.cardsRepository.getRandomizedCardIdsByUser(command.userId);

    cardList.markModified('cardListToSend');

    const savedCardList = await this.cardListRepository.saveList(cardList);
    return savedCardList;
  }
}
