import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { SchedulerService } from './scheduler.servise';

@Module({
  imports: [ScheduleModule.forRoot()],
  exports: [],
  providers: [SchedulerService],
})
export class SchedulerModule {}
