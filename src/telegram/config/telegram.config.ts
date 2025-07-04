import { Injectable } from '@nestjs/common';
import { configValidationUtility } from '../../setup/utils/config-validation-utility';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CoreConfig {
  @IsNotEmpty({
    message:
      "Set Env variable TELEGRAM_BOT_TOKEN, example: '132468521684:sfdsfdsfs_dgrg', ",
  })
  adminCredentials: string = this.configService.get('TELEGRAM_BOT_TOKEN');

  constructor(private configService: ConfigService<any, true>) {
    configValidationUtility.validateConfig(this);
  }
}
