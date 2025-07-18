import { UserCreateCardUseCase } from './create-card.use-case';
import { GetCardFromListUseCase } from './get-card-from-list.use-case';
import { RenewRemainderListUseCase } from './renew-card-list.use-case';

export const CardUseCases = [
  UserCreateCardUseCase,
  RenewRemainderListUseCase,
  GetCardFromListUseCase,
];
