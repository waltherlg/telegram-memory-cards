import { IsNotEmpty, IsString, Length, Matches } from 'class-validator';
import { USER_CONSTANTS } from '../../user.config/users.constants/user.constants';

export class RegisterUserInput implements IUserBase {
  @IsString()
  @IsNotEmpty()
  @Length(
    USER_CONSTANTS.USERNAME.LENGTH_MIN,
    USER_CONSTANTS.USERNAME.LENGTH_MAX,
  )
  @Matches(USER_CONSTANTS.USERNAME.PATTERN)
  @IsString()
  userName: string;
  @IsString()
  @IsNotEmpty()
  @Length(
    USER_CONSTANTS.PASSWORD.LENGTH_MIN,
    USER_CONSTANTS.PASSWORD.LENGTH_MAX,
  )
  @Matches(USER_CONSTANTS.PASSWORD.PATTERN)
  @IsString()
  password: string;
}
