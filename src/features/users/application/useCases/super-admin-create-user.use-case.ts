import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUserDto } from '../../domain/dto/user.domain.dto';
import { UsersRepository } from '../../infrastructure/users.repository';

export class SaCreateUserCommand {
  constructor(public dto: CreateUserDto) {}
}

@CommandHandler(SaCreateUserCommand)
export class SaCreateUserUseCase
  implements ICommandHandler<SaCreateUserCommand>
{
  constructor(private readonly usersRepository: UsersRepository) {}
  async execute(command: SaCreateUserCommand): Promise<any> {
    return await this.usersRepository.createUser(command.dto);
  }
}
