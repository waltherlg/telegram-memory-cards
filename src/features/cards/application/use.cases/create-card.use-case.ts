import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCardDto } from '../../domain/dto/cards.dto';
import { CardsRepository } from '../../infrastructure/cards.repository';
import { CardListRepository } from '../../infrastructure/cards-list.repository';
import { CardListDocument } from '../../infrastructure/schemas/cards-list.shema';

export class UserCreateCardCommand {
  constructor(public dto: CreateCardDto) {}
}

@CommandHandler(UserCreateCardCommand)
export class UserCreateCardUseCase
  implements ICommandHandler<UserCreateCardCommand>
{
  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly cardListRepo: CardListRepository,
  ) {}

  async execute(command: UserCreateCardCommand): Promise<string> {
    const createdCard = await this.cardsRepository.createCard(command.dto);
    const cardList: CardListDocument = await this.cardListRepo.getCardList(
      command.dto.userId,
    );
    cardList.addCardToList(createdCard._id);
    console.log(cardList);
    return createdCard.title;
  }
}
