import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { ActionResultEnum } from '../../../../core/errors/handlers/action-result.handler';
import { CardsRepository } from '../../../cards/infrastructure/cards.repository';
import { CardListRepository } from '../../../cards/infrastructure/cards-list.repository';

export class TelegramUserDeleteCardCommand {
  constructor(
    public userId: Types.ObjectId,
    public title: string,
  ) {}
}

@CommandHandler(TelegramUserDeleteCardCommand)
export class TelegramUserDeleteCardUseCase
  implements ICommandHandler<TelegramUserDeleteCardCommand>
{
  constructor(
    private readonly cardListRepo: CardListRepository,
    private readonly cardRepo: CardsRepository,
  ) {}

  async execute(
    command: TelegramUserDeleteCardCommand,
  ): Promise<ActionResultEnum> {
    const card = await this.cardRepo.getCardByTitle(command.title);
    if (!card) return ActionResultEnum.CardNotFound;
    if (card.userId !== command.userId) return ActionResultEnum.NotOwner;

    await this.cardRepo.deleteCardById(card._id);

    const cardList = await this.cardListRepo.getCardList(command.userId);
    cardList.removeCardFromList(card._id);

    return ActionResultEnum.Success;
  }
}
