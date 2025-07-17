import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from '../features/users/infrastructure/users.repository';
import { CoreConfig } from '../core/config/core.config';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly coreConfig: CoreConfig,
  ) {}

  async BasecAuthorization(authHeader): Promise<boolean> {
    const authType = authHeader.split(' ')[0];
    if (authType !== 'Basic') {
      throw new UnauthorizedException();
    }
    const auth = Buffer.from(authHeader.split(' ')[1], 'base64').toString();
    if (auth !== this.coreConfig.adminCredentials) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
