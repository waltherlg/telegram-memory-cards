import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { USER_PATHS } from '../user.config/users.constants/users.paths';
import { RegisterUserInput } from './dto/user.input.dto';
import { CommandBus } from '@nestjs/cqrs';
import { SaCreateUserCommand } from '../application/useCases/super-admin-create-user.use-case';
import { BasicAuthGuard } from '../../../auth/guards/basic-auth-guard/basic-auth.guard';

@Controller(USER_PATHS.SA_USERS)
export class SaUsersController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get(USER_PATHS.HELLO)
  async helloFromSaUsers() {
    return 'hello form sa users';
  }

  @UseGuards(BasicAuthGuard)
  @Post()
  async saCreateUser(@Body() body: RegisterUserInput) {
    const result = await this.commandBus.execute(new SaCreateUserCommand(body));
    return result;
  }
}
