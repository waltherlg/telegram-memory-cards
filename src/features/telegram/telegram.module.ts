import { Module } from '@nestjs/common';
import { TelegramConfig } from './config/telegram.config';
import { TelegramUpdateHandler } from './telegram.update.handler';
import { TelegramService } from './telegram.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  UserTelegram,
  UserTelegramSchema,
} from './infrfstructure/schemas/user.telegram.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: UserTelegram.name, schema: UserTelegramSchema },
    ]),
  ],
  providers: [TelegramService, TelegramUpdateHandler, TelegramConfig],
})
export class TelegramModule {}
