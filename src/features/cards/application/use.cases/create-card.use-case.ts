import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateCardDto } from '../../domain/dto/cards.dto';
import { CardsRepository } from '../../infrastructure/cards.repository';

export class UserCreateCardCommand {
  constructor(public dto: CreateCardDto) {}
}

@CommandHandler(UserCreateCardCommand)
export class UserCreateCardUseCase
  implements ICommandHandler<UserCreateCardCommand>
{
  constructor(private readonly cardsRepository: CardsRepository) {}

  async execute(command: UserCreateCardCommand): Promise<string> {
    const title = await this.cardsRepository.createCard(command.dto);
    return title;
  }
}
