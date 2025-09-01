import { CommandBus, CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { CardListRepository } from '../../infrastructure/cards-list.repository';
import { RenewCardListCommand } from './renew-card-list.use-case';

export class SetCurrentCategoryCommand {
  constructor(
    public userId: Types.ObjectId,
    public category: string | null,
  ) {}
}

@CommandHandler(SetCurrentCategoryCommand)
export class SetCurrentCategoryUseCase
  implements ICommandHandler<SetCurrentCategoryCommand>
{
  constructor(
    private readonly cardListRepository: CardListRepository,
    private readonly commandBus: CommandBus,
  ) {}
  async execute(command: SetCurrentCategoryCommand): Promise<void> {
    const list = await this.cardListRepository.getCardList(command.userId);
    await list.setCurrentCategory(command.category);
    await this.commandBus.execute(new RenewCardListCommand(command.userId));
  }
}
