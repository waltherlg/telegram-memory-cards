import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';
import { CardListRepository } from '../../infrastructure/cards-list.repository';
import { CardsRepository } from '../../infrastructure/cards.repository';

export class DeleteCardCommand {
  constructor(
    public userId: Types.ObjectId,
    public cardId: Types.ObjectId,
  ) {}
}

@CommandHandler(DeleteCardCommand)
export class DeleteCardUseCase implements ICommandHandler<DeleteCardCommand> {
  constructor(
    private readonly cardListRepo: CardListRepository,
    private readonly cardRepo: CardsRepository,
  ) {}

  async execute(command: DeleteCardCommand): Promise<any> {}
}
