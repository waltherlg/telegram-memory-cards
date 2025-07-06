import { IsString } from 'class-validator';

export class CreateUserDto implements IUserBase {
  @IsString()
  userName: string;
  @IsString()
  password: string;
}
