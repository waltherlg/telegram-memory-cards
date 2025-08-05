import { Module } from '@nestjs/common';
import { CardsController } from './api/cards.controller';
import { CardUseCases } from './application/use.cases/cards.use-cases';
import { CardsRepository } from './infrastructure/cards.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './infrastructure/schemas/card.schema';
import {
  RemainderList,
  ReminderListSchema,
} from './infrastructure/schemas/cards-list.shema';
import { RemainderListRepository } from './infrastructure/cards-list.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: RemainderList.name, schema: ReminderListSchema },
    ]),
  ],
  controllers: [CardsController],
  providers: [...CardUseCases, CardsRepository, RemainderListRepository],
  exports: [CardsRepository],
})
export class CardModule {}
