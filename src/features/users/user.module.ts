import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { SaUsersController } from './api/sa.user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/schemas/user.schema';
import { UsersRepository } from './infrastructure/users.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController, SaUsersController],
  providers: [UsersRepository],
})
export class UserModule {}
