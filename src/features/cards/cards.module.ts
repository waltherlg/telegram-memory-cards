import { Module } from '@nestjs/common';
import { CardsController } from './api/cards.controller';
import { CardUseCases } from './application/use.cases/cards.use-cases';
import { CardsRepository } from './infrastructure/cards.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from './infrastructure/schemas/card.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
  ],
  controllers: [CardsController],
  providers: [...CardUseCases, CardsRepository],
})
export class CardModule {}
