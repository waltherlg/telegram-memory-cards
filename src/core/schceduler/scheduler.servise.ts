import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  // Пример: задача каждые 2 часа
  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.log('⏰ Запустилась задача по расписанию');
    // Здесь можно вызвать use-case, отправить сообщение и т.д.
  }
}
