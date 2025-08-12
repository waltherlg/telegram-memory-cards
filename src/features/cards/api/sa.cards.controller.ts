import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SA_CARDS_PATHS } from '../config/card.constants/cards.paths';
import { BasicAuthGuard } from '../../../auth/guards/basic-auth-guard/basic-auth.guard';
import { ApiBasicAuth } from '@nestjs/swagger';
import { CreateCardDto } from '../domain/dto/cards.dto';
import { SaCreateCardSwagger } from '../config/sa-cards.swagger-decorators';

@Controller(SA_CARDS_PATHS.CARDS)
export class SaCardsController {
  @SaCreateCardSwagger()
  @UseGuards(BasicAuthGuard)
  @Post()
  async saCreateCard(@Body() body: CreateCardDto) {}
}
