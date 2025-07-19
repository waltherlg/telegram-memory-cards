import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.servise';
import { TelegramModule } from '../../features/telegram/telegram.module';

@Module({
  imports: [ScheduleModule.forRoot(), TelegramModule],
  exports: [],
  providers: [SchedulerService],
})
export class SchedulerModule {}
