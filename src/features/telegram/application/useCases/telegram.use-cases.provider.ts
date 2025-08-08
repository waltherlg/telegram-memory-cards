import { SendCardToAllUsersUseCase } from './send-random-card-to-all-users.use-case';
import { SwitchTelegramNotificationUseCase } from './switch-telegram-notificatio.use-case';
import { TelegramTestMessageUseCase } from './test-message.use-case';
import { UserRegisterViaTelegramUseCase } from './user-register-via-telegram.use-case';

export const TelegramUseCases = [
  UserRegisterViaTelegramUseCase,
  TelegramTestMessageUseCase,
  SendCardToAllUsersUseCase,
  SwitchTelegramNotificationUseCase,
];
