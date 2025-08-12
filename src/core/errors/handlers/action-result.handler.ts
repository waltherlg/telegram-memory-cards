import {
  BadRequestException,
  ForbiddenException,
  ImATeapotException,
  NotFoundException,
} from '@nestjs/common';

export enum ActionResultEnum {
  Success = 'SUCCESS',
  AlreadyRegistered = 'ALREADY_REGISTERED',
  TelegramAlreadyRegistered = 'TELEGRAM_ALREADY_REGISTERED',
  CardAlreadyExist = 'CARD_ALREADY_EXIST',
  NoCardsInList = 'NO_CARDS_IN_LIST',
  CardNotFound = 'CARD_NOT_FOUND',
  NotNotificationTime = 'NOT_NOTIFICATION_TIME',
  UserNotFound = 'USER_NOT_FOUND',
  NoCardsInCollection = 'NO_CARDS_IN_COLLECTION',
  NotOwner = 'NotOwner',
  SomeThingWrong = 'SOME_THING_WRONG',
}

export function HandleActionResult(result): boolean {
  if (!Object.values(ActionResultEnum).includes(result)) {
    return true;
  }
  switch (result) {
    case ActionResultEnum.Success:
      return true;

    case ActionResultEnum.NotNotificationTime:
      return true;

    case ActionResultEnum.TelegramAlreadyRegistered:
      return false;

    case ActionResultEnum.NoCardsInList:
      throw new NotFoundException('Card in list');

    case ActionResultEnum.CardNotFound:
      throw new NotFoundException('Card not found');

    case ActionResultEnum.AlreadyRegistered:
      throw new BadRequestException('AlreadyRegistered');

    case ActionResultEnum.UserNotFound:
      throw new NotFoundException('User not found');

    case ActionResultEnum.SomeThingWrong:
      throw new ImATeapotException('SomeThingWrong');

    case ActionResultEnum.NoCardsInCollection:
      throw new NotFoundException('No cards in collection');

    case ActionResultEnum.NotOwner:
      throw new ForbiddenException('not owner');

    case ActionResultEnum.CardAlreadyExist:
      throw new BadRequestException('Card Already Exist');
  }
}
