import { Controller, Post } from '@nestjs/common';
import { SA_CARDS_PATHS } from '../config/card.constants/cards.paths';

@Controller(SA_CARDS_PATHS.CARDS)
export class SaCardsController {
  @Post()
  async saCreateCard() {}
}
