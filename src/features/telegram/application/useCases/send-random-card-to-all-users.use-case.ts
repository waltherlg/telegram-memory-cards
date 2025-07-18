import { TelegramAdapter } from '../../../../core/telegram/telegram.adapter';
import { CardsRepository } from '../../../cards/infrastructure/cards.repository';
import { UsersRepository } from '../../../users/infrastructure/users.repository';

export class SendCardToAllUsers {
  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly telegramAdapter: TelegramAdapter,
  ) {}
}
