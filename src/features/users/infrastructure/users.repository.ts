import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
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
    await newUser.save();
    return newUser._id.toString();
  }

  async getUserById(
    _id: Types.ObjectId | string,
  ): Promise<UserDocument | null> {
    const user = await this.userModel.findById(_id);
    if (!user) return null;
    return user;
  }

  async save(user: UserDocument): Promise<UserDocument> {
    const savedUser = await user.save();
    return savedUser;
  }

  async getUserByTelegramId(telegramId: string): Promise<UserDocument | null> {
    const user = await this.userModel.findOne({ telegramId });
    if (!user) return null;
    return user;
  }

  async getAllTelegramUsers(): Promise<UserDocument[]> {
    const users = await this.userModel.find({
      telegramId: { $exists: true, $ne: null },
    });
    return users;
  }

  async exchangeTelegramIdToUserId(
    telegramId: string,
  ): Promise<Types.ObjectId | null> {
    const user = await this.userModel.findOne({ telegramId });
    if (!user) return null;
    return user._id;
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
