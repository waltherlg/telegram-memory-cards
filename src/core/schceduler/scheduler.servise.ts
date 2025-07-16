import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TelegramTestMessageCommand } from '../../features/telegram/application/useCases/test-message.use-case';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Cron(CronExpression.EVERY_30_SECONDS)
  async handleCron() {
    this.logger.log('⏰ Запустилась задача по расписанию');
    await this.commandBus.execute(
      new TelegramTestMessageCommand('⏰ Запустилась задача по расписанию'),
    );
  }
}
