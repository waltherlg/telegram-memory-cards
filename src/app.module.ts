import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './features/cards/cards.module';
import { CoreModule } from './core/core.module';
import { configModule } from './config';
import { TelegramModule } from './telegram/telegram.module';

@Module({
  imports: [CardModule, CoreModule, configModule, TelegramModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
