import { Module } from '@nestjs/common';
import { CardsController } from './api/cards.controller';

@Module({
  imports: [],
  controllers: [CardsController],
  providers: [],
})
export class CardModule {}
