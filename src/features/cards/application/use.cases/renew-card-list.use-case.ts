import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { CardsRepository } from '../../infrastructure/cards.repository';
import { RemainderListDocument } from '../../infrastructure/schemas/cards-remainder-list';
import { RemainderListRepository } from '../../infrastructure/cards-list.repository';

export class RenewRemainderListCommand {
  constructor(public userId: Types.ObjectId) {}
}

@CommandHandler(RenewRemainderListCommand)
export class RenewRemainderListUseCase
  implements ICommandHandler<RenewRemainderListCommand>
{
  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly remainderListRepository: RemainderListRepository,
  ) {}

  async execute(
    command: RenewRemainderListCommand,
  ): Promise<RemainderListDocument> {
    const cardList = await this.remainderListRepository.getReminderList(
      command.userId,
    );

    cardList.cardListToSend =
      await this.cardsRepository.getRandomizedCardIdsByUser(command.userId);

    cardList.markModified('cardListToSend');

    const savedCardList = await this.remainderListRepository.saveList(cardList);
    return savedCardList;
  }
}
