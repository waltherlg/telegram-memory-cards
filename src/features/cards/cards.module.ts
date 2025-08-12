import { Module } from '@nestjs/common';
import { CardsController } from './api/cards.controller';
import { CardUseCases } from './application/use.cases/cards.use-cases';
import { CardsRepository } from './infrastructure/cards.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './infrastructure/schemas/card.schema';
import {
  CardList,
  CardListSchema,
} from './infrastructure/schemas/cards-list.shema';
import { CardListRepository } from './infrastructure/cards-list.repository';
import { SaCardsController } from './api/sa.cards.controller';
import { UserModule } from '../users/user.module';

@Module({
  imports: [
    UserModule,
    MongooseModule.forFeature([
      { name: Card.name, schema: CardSchema },
      { name: CardList.name, schema: CardListSchema },
    ]),
  ],
  controllers: [CardsController, SaCardsController],
  providers: [...CardUseCases, CardsRepository, CardListRepository],
  exports: [CardsRepository],
})
export class CardModule {}
