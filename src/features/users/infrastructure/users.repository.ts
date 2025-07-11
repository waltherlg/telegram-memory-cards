import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../domain/dto/user.domain.dto';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserTelegramDto } from '../../telegram/domain/dto/user.telegram.domain.dto';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(
    userDto: CreateUserDto | CreateUserTelegramDto,
  ): Promise<string> {
    const newUser = new this.userModel(userDto);
    console.log(newUser);
    await newUser.save();
    return newUser._id.toString();
  }

  async isUserNameExist(userName: string): Promise<boolean> {
    const count = await this.userModel.countDocuments({ userName });
    return count > 0;
  }

  async isUserTelegramIdExist(telegramId: string): Promise<boolean> {
    const count = await this.userModel.countDocuments({ telegramId });
    return count > 0;
  }

  async isEmailExist(email: string): Promise<boolean> {
    const count = await this.userModel.countDocuments({ email });
    return count > 0;
  }
}
