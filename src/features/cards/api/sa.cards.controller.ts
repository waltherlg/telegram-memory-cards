import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { SA_CARDS_PATHS } from '../config/card.constants/cards.paths';
import { BasicAuthGuard } from '../../../auth/guards/basic-auth-guard/basic-auth.guard';
import { ApiBasicAuth } from '@nestjs/swagger';
import { CreateCardDto } from '../domain/dto/cards.dto';
import { SaCreateCardSwagger } from '../config/sa-cards.swagger-decorators';
import { SaCreateCardInputDto } from './dto/card.input.dto';
import { CommandBus } from '@nestjs/cqrs';
import {
  UserCreateCardCommand,
  UserCreateCardUseCase,
} from '../application/use.cases/create-card.use-case';
import { HandleActionResult } from '../../../core/errors/handlers/action-result.handler';

@Controller(SA_CARDS_PATHS.CARDS)
export class SaCardsController {
  constructor(private readonly commandBus: CommandBus) {}
  @SaCreateCardSwagger()
  @UseGuards(BasicAuthGuard)
  @Post()
  async saCreateCard(@Body() body: SaCreateCardInputDto) {
    const result = await this.commandBus.execute(
      new UserCreateCardCommand(body),
    );

    HandleActionResult(result);

    return result;
  }
}
