import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { SaUsersController } from './api/sa.user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersRepository } from './infrastructure/users.repository';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { SaUsersUseCases } from './application/useCases/user.use-cases.providers';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController, SaUsersController],
  providers: [UsersRepository, ...SaUsersUseCases],
  exports: [UsersRepository],
})
export class UserModule {}
