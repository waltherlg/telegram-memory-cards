import { SendRandomCardUseCase } from './send-random-card.use-case';
import { TelegramTestMessageUseCase } from './test-message.use-case';
import { UserRegisterViaTelegramUseCase } from './user-register-via-telegram.use-case';

export const TelegramUseCases = [
  UserRegisterViaTelegramUseCase,
  TelegramTestMessageUseCase,
  SendRandomCardUseCase,
];
