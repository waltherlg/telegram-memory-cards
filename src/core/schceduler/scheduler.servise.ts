import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TelegramTestMessageCommand } from '../../features/telegram/application/useCases/test-message.use-case';
import { SendCardToAllUsersCommand } from '../../features/telegram/application/useCases/send-random-card-to-all-users.use-case';

@Injectable()
export class SchedulerService {
  private readonly logger = new Logger(SchedulerService.name);

  constructor(private readonly commandBus: CommandBus) {}

  @Cron(CronExpression.EVERY_2_HOURS)
  async sendCards() {
    this.logger.log('⏰ Запустилась задача по расписанию');
    this.commandBus.execute(new SendCardToAllUsersCommand(true));
  }
}
