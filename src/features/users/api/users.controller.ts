import { Controller, Get } from '@nestjs/common';
import { USER_PATHS } from '../user.config/users.constants/users.paths';

@Controller(USER_PATHS.USERS)
export class UsersController {
  constructor() {}

  @Get(USER_PATHS.HELLO)
  async helloFromUsers() {
    return 'hello form users';
  }
}
