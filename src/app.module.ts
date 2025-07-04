import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardModule } from './features/cards/cards.module';
import { CoreModule } from './core/core.module';
import { configModule } from './config';

@Module({
  imports: [CardModule, CoreModule, configModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
