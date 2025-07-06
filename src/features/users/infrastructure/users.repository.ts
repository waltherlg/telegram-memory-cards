import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../domain/dto/user.domain.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersRepository {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(userDto: CreateUserDto): Promise<string> {
    const newUser = new this.userModel(userDto);
    await newUser.save();
    return newUser._id.toString();
  }
}
