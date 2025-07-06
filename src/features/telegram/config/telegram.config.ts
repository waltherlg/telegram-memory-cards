import { Injectable } from '@nestjs/common';
import { configValidationUtility } from '../../../setup/utils/config-validation-utility';
import { IsNotEmpty } from 'class-validator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramConfig {
  @IsNotEmpty({
    message:
      "Set Env variable TELEGRAM_BOT_TOKEN, example: '132468521684:sfdsfdsfs_dgrg', ",
  })
  telegramBotToken: string = this.configService.get('TELEGRAM_BOT_TOKEN');

  @IsNotEmpty({
    message: "Set Env variable TELEGRAM_BOT_NAME, example: 'some-bot-name', ",
  })
  telegramBotName: string = this.configService.get('TELEGRAM_BOT_NAME');

  constructor(private configService: ConfigService<any, true>) {
    configValidationUtility.validateConfig(this);
  }
}
