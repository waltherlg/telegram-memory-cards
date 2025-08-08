import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { ActionResultEnum } from '../../../../core/errors/handlers/action-result.handler';
import { CardsRepository } from '../../infrastructure/cards.repository';
import { CardListRepository } from '../../infrastructure/cards-list.repository';

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
    console.log(command.title);
    const card = await this.cardRepo.getCardByTitleAndUserId(
      command.title,
      command.userId,
    );
    if (!card) return ActionResultEnum.CardNotFound;

    if (!card.userId.equals(command.userId)) return ActionResultEnum.NotOwner;

    const result = await this.cardRepo.deleteCardById(card._id);
    if (!result) return ActionResultEnum.SomeThingWrong;

    const cardList = await this.cardListRepo.getCardList(command.userId);
    cardList.removeCardFromList(card._id);

    return ActionResultEnum.Success;
  }
}
