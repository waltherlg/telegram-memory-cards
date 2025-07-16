import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CardsRepository } from '../../../cards/infrastructure/cards.repository';
import { UsersRepository } from '../../../users/infrastructure/users.repository';
import { TelegramAdapter } from '../../../../core/telegram/telegram.adapter';

export class SendRandomCardCommand {
  constructor(public telegramId: string) {}
}

@CommandHandler(SendRandomCardCommand)
export class SendRandomCardUseCase
  implements ICommandHandler<SendRandomCardCommand>
{
  constructor(
    private readonly cardsRepository: CardsRepository,
    private readonly usersRepository: UsersRepository,
    private readonly telegramAdapter: TelegramAdapter,
  ) {}
  async execute(command: SendRandomCardCommand): Promise<void> {
    const userId = await this.usersRepository.exchangeTelegramIdToUserId(
      command.telegramId,
    );
    const card = await this.cardsRepository.getRandomCardByUser(userId);
    await this.telegramAdapter.sendMessage(command.telegramId, card.text);
  }
}
