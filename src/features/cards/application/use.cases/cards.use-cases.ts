import { UserCreateCardUseCase } from './create-card.use-case';
import { DeleteCardUseCase } from './delete-card.use-case';
import { GetCardFromListUseCase } from './get-card-from-list.use-case';
import { RenewCardListUseCase } from './renew-card-list.use-case';
import { SetMinRemindIntervalUseCase } from './set-remind-interval.use-case';
import { TelegramUserDeleteCardUseCase } from './tg-user-delete-card.use-case';

export const CardUseCases = [
  UserCreateCardUseCase,
  RenewCardListUseCase,
  GetCardFromListUseCase,
  DeleteCardUseCase,
  TelegramUserDeleteCardUseCase,
  SetMinRemindIntervalUseCase,
];
