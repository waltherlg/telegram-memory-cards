import { Body, Controller, Get, Post } from '@nestjs/common';
import { USER_PATHS } from '../user.config/users.constants/users.paths';
import { RegisterUserInput } from './dto/user.input.dto';
import { UsersRepository } from '../infrastructure/users.repository';

@Controller(USER_PATHS.SA_USERS)
export class SaUsersController {
  constructor(private readonly usersRepository: UsersRepository) {}

  @Get(USER_PATHS.HELLO)
  async helloFromSaUsers() {
    return 'hello form sa users';
  }

  @Post()
  async saCreateUser(@Body() body: RegisterUserInput) {
    const result = await this.usersRepository.createUser(body);
    return result;
  }
}
