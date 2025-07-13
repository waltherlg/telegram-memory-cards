import { Module } from '@nestjs/common';
import { CardsController } from './api/cards.controller';
import { CardUseCases } from './application/use.cases/cards.use-cases';
import { CardsRepository } from './infrastructure/cards.repository';

@Module({
  imports: [],
  controllers: [CardsController],
  providers: [...CardUseCases, CardsRepository],
})
export class CardModule {}
