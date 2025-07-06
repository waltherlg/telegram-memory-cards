import { Injectable } from '@nestjs/common';
import { configValidationUtility } from '../../setup/utils/config-validation-utility';
import { IsEnum, IsNotEmpty, IsNumber } from 'class-validator';
import { ConfigService } from '@nestjs/config';

export enum Environments {
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  TESTING = 'testing',
  PRODUCTION = 'production',
}

@Injectable()
export class CoreConfig {
  @IsNumber(
    {},
    {
      message: 'Set Env variable PORT, example: 3000',
    },
  )
  port: number = Number(this.configService.get('PORT'));

  @IsNotEmpty({
    message:
      'Set Env variable MONGO_URL, example: mongodb+srv://admin:qwerty@cluster0.sgfsg.mongodb.net/?retryWrites=true&w=majority',
  })
  mongoURL: string = this.configService.get<string>('MONGO_URL');

  @IsEnum(Environments, {
    message:
      'Set correct NODE_ENV value, available values: ' +
      configValidationUtility.getEnumValues(Environments).join(', '),
  })
  env: string = this.configService.get('NODE_ENV');

  @IsNotEmpty({
    message:
      "Set Env variable ADMIN_CREDENTIALS, example: 'login:password', !!sensitive data!!",
  })
  adminCredentials: string = this.configService.get('ADMIN_CREDENTIALS');

  constructor(private configService: ConfigService<any, true>) {
    configValidationUtility.validateConfig(this);
  }
}
