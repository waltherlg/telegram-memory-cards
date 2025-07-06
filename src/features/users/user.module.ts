import { Module } from '@nestjs/common';
import { UsersController } from './api/users.controller';
import { SaUsersController } from './api/sa.user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './infrastructure/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController, SaUsersController],
  providers: [],
})
export class UserModule {}
