import { Controller, Get } from '@nestjs/common';
import { USER_PATHS } from '../user.config/users.constants/users.paths';

@Controller(USER_PATHS.SA_USERS)
export class SaUsersController {
  constructor() {}

  @Get(USER_PATHS.HELLO)
  async helloFromSaUsers() {
    return 'hello form sa users';
  }
}
