import { IsString } from 'class-validator';

export class CreateUserTelegramDto implements IUserTelegramBase {
  @IsString()
  telegramId: string;
}
