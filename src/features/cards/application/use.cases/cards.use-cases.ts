import { UserCreateCardUseCase } from './create-card.use-case';
import { GetCardFromListUseCase } from './get-card-from-list.use-case';
import { RenewCardListUseCase } from './renew-card-list.use-case';

export const CardUseCases = [
  UserCreateCardUseCase,
  RenewCardListUseCase,
  GetCardFromListUseCase,
];
