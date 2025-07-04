import { Controller, Get } from '@nestjs/common';
import { CARDS_PATHS } from '../config/card.constants.ts/cards.paths';

@Controller(CARDS_PATHS.CARDS)
export class CardsController {
  @Get(CARDS_PATHS.HELLO)
  async getHello() {
    return 'hello from cards controller';
  }
}
