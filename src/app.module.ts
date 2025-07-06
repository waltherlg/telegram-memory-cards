import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './features/cards/cards.module';
import { CoreModule } from './core/core.module';
import { configModule } from './config';
import { TelegramModule } from './features/telegram/telegram.module';
import { DatabaseModule } from './core/database/database.module';
import { UserModule } from './features/users/user.module';

@Module({
  imports: [
    CardModule,
    CoreModule,
    configModule,
    TelegramModule,
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
