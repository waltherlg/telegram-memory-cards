import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserTelegramDto } from '../../domain/dto/user.telegram.domain.dto';
import { UsersRepository } from '../../../users/infrastructure/users.repository';

export class UserRegisterViaTelegramCommand {
  constructor(public dto: CreateUserTelegramDto) {}
}

@CommandHandler(UserRegisterViaTelegramCommand)
export class UserRegisterViaTelegramUseCase
  implements ICommandHandler<UserRegisterViaTelegramCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(command: UserRegisterViaTelegramCommand): Promise<any> {
    const result = await this.usersRepository.createUser(command.dto);
    return result;
  }
}
