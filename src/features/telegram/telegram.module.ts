import { Module } from '@nestjs/common';
import { TelegramConfig } from './config/telegram.config';
import { TelegramUpdateHandler } from './api/telegram.update.handler';
import { TelegramService } from './telegram.service';
import { TelegramUseCases } from './application/useCases/telegram.use-cases.provider';
import { UsersRepository } from '../users/infrastructure/users.repository';
import { UserModule } from '../users/user.module';

@Module({
  imports: [UserModule],
  providers: [
    TelegramService,
    TelegramUpdateHandler,
    TelegramConfig,
    ...TelegramUseCases,
  ],
})
export class TelegramModule {}
