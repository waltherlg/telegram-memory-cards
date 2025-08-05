import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCardDto } from '../../domain/dto/cards.dto';
import { CardsRepository } from '../../infrastructure/cards.repository';
import { RemainderListRepository } from '../../infrastructure/cards-list.repository';
import { RemainderListDocument } from '../../infrastructure/schemas/cards-remainder-list';

export class UserCreateCardCommand {
  constructor(public dto: CreateCardDto) {}
}

@CommandHandler(UserCreateCardCommand)
export class UserCreateCardUseCase
  implements ICommandHandler<UserCreateCardCommand>
{
  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly cardListRepo: RemainderListRepository,
  ) {}

  async execute(command: UserCreateCardCommand): Promise<string> {
    const createdCard = await this.cardsRepository.createCard(command.dto);
    const cardList: RemainderListDocument =
      await this.cardListRepo.getReminderList(command.dto.userId);
    cardList.addCardToList(createdCard._id);
    console.log(cardList);
    return createdCard.title;
  }
}
