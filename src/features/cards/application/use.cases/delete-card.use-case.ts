import { CommandHandler } from '@nestjs/cqrs';
import { Types } from 'mongoose';

export class DeleteCardCommand {
  constructor(
    public userId: Types.ObjectId,
    public cardId: Types.ObjectId,
  ) {}
}

@CommandHandler(DeleteCardCommand)
export class DeleteCardUseCase {
  constructor() {}
}
